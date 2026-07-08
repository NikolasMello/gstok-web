import { HttpError } from './HttpError'
import type { HttpRequestConfig, HttpResponse } from './types'

export class HttpClient {
  constructor(private readonly baseURL: string) {}

  get<T>(path: string, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'GET' }).then((response) => response.data)
  }

  post<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'POST', body }).then((response) => response.data)
  }

  put<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'PUT', body }).then((response) => response.data)
  }

  patch<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'PATCH', body }).then((response) => response.data)
  }

  delete<T>(path: string, body?: unknown, config?: HttpRequestConfig) {
    return this.request<T>(path, { ...config, method: 'DELETE', body }).then((response) => response.data)
  }

  /**
   * Envelope completo (status/headers) fica isolado aqui — os verbos públicos acima só expõem `data`.
   * Se algum call site futuro precisar de status/headers de uma resposta com sucesso, adicione um
   * método dedicado (ex.: `getWithMeta`) chamando `request()` sem o `.then(unwrap)`, em vez de mudar
   * o contrato dos verbos existentes.
   */
  private async request<T>(
    path: string,
    config: HttpRequestConfig & { method: string; body?: unknown },
  ): Promise<HttpResponse<T>> {
    const { params, body, headers, credentials, ...rest } = config

    const finalHeaders = new Headers(headers)
    const isRawBody = body instanceof FormData || body instanceof Blob || typeof body === 'string'

    if (body !== undefined && !isRawBody && !finalHeaders.has('Content-Type')) {
      finalHeaders.set('Content-Type', 'application/json')
    }

    const response = await fetch(this.buildURL(path, params), {
      ...rest,
      // Padrão 'include': necessário para o cookie httpOnly de sessão trafegar
      // mesmo quando front e API estão em origens diferentes (ex.: portas distintas em dev).
      credentials: credentials ?? 'include',
      headers: finalHeaders,
      body: body === undefined ? undefined : isRawBody ? (body as BodyInit) : JSON.stringify(body),
    })

    const data = await this.parseBody<T>(response)
    if (!response.ok) {
      throw new HttpError(response.statusText || 'Request failed', response.status, data)
    }

    return { data, status: response.status, headers: response.headers }
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
