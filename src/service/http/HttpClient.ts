import { HttpError } from './HttpError'
import type { HttpRequestConfig, HttpResponse, RefreshTokenHandler } from './types'

interface QueueEntry {
  resolve: (token: string) => void
  reject: (reason: unknown) => void
}

export class HttpClient {
  private token: string | null = null
  private refreshTokenHandler: RefreshTokenHandler | null = null
  private onRefreshFailure: ((reason: unknown) => void) | null = null

  private isRefreshing = false
  private refreshPromise: Promise<string> | null = null
  private pendingQueue: QueueEntry[] = []

  constructor(private readonly baseURL: string) {}

  setToken(token: string | null) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  setRefreshTokenHandler(handler: RefreshTokenHandler) {
    this.refreshTokenHandler = handler
  }

  /** Chamado quando o refresh falha (ex.: para redirecionar para o login). */
  setOnRefreshFailure(handler: (reason: unknown) => void) {
    this.onRefreshFailure = handler
  }

  get<T>(path: string, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'GET' })
  }

  post<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'POST', body })
  }

  put<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'PUT', body })
  }

  patch<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'PATCH', body })
  }

  delete<T>(path: string, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'DELETE' })
  }

  private async request<T>(
    path: string,
    config: HttpRequestConfig & { method: string; body?: unknown },
    isRetry = false,
  ): Promise<HttpResponse<T>> {
    const { auth = true, params, body, headers, credentials, ...rest } = config

    const token = auth ? await this.resolveToken() : null
    const finalHeaders = new Headers(headers)
    const isRawBody = body instanceof FormData || body instanceof Blob || typeof body === 'string'

    if (body !== undefined && !isRawBody && !finalHeaders.has('Content-Type')) {
      finalHeaders.set('Content-Type', 'application/json')
    }
    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(this.buildURL(path, params), {
      ...rest,
      // Padrão 'include': necessário para o cookie httpOnly de refresh trafegar
      // mesmo quando front e API estão em origens diferentes (ex.: portas distintas em dev).
      credentials: credentials ?? 'include',
      headers: finalHeaders,
      body: body === undefined ? undefined : isRawBody ? (body as BodyInit) : JSON.stringify(body),
    })

    if (response.status === 401 && auth && !isRetry) {
      await this.triggerRefresh()
      return this.request<T>(path, config, true)
    }

    const data = await this.parseBody<T>(response)
    if (!response.ok) {
      throw new HttpError(response.statusText || 'Request failed', response.status, data)
    }

    return { data, status: response.status, headers: response.headers }
  }

  /** Se um refresh estiver em andamento, aguarda o novo token antes de seguir com a requisição. */
  private resolveToken(): Promise<string | null> {
    if (!this.isRefreshing) {
      return Promise.resolve(this.token)
    }
    return new Promise((resolve, reject) => {
      this.pendingQueue.push({ resolve, reject })
    })
  }

  private triggerRefresh(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefreshing = true
    this.refreshPromise = this.doRefresh().finally(() => {
      this.isRefreshing = false
      this.refreshPromise = null
    })
    return this.refreshPromise
  }

  private async doRefresh(): Promise<string> {
    try {
      if (!this.refreshTokenHandler) {
        throw new Error('refreshTokenHandler não configurado no HttpClient')
      }
      const newToken = await this.refreshTokenHandler()
      this.setToken(newToken)
      this.pendingQueue.forEach(({ resolve }) => resolve(newToken))
      this.pendingQueue = []
      return newToken
    } catch (error) {
      this.pendingQueue.forEach(({ reject }) => reject(error))
      this.pendingQueue = []
      this.setToken(null)
      this.onRefreshFailure?.(error)
      throw error
    }
  }

  private buildURL(path: string, params?: HttpRequestConfig['params']): string {
    const base = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    const url = new URL(normalizedPath, base)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) url.searchParams.set(key, String(value))
      }
    }

    return url.toString()
  }

  private async parseBody<T>(response: Response): Promise<T> {
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      return (await response.json()) as T
    }

    return (await response.text()) as unknown as T
  }
}
