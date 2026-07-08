export interface HttpRequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
  headers?: HeadersInit
  params?: Record<string, string | number | boolean | undefined>
}

export interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
}

export interface PagedResult<T> {
  items: T[]
  page: number
  page_size: number
  total_count: number
  total_pages: number
}
