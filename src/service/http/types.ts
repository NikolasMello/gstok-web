export interface HttpRequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
  headers?: HeadersInit
  params?: Record<string, string | number | boolean | undefined>
}

export interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
}
