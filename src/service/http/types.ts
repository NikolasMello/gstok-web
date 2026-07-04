export interface HttpRequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
  headers?: HeadersInit
  params?: Record<string, string | number | boolean | undefined>
  /** Anexa `Authorization: Bearer <token>` quando true (padrão) e houver token definido. */
  auth?: boolean
}

export interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
}

/** Deve retornar o novo access token após renová-lo. */
export type RefreshTokenHandler = () => Promise<string>
