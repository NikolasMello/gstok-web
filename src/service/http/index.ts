import { HttpClient } from './HttpClient'

export const httpClient = new HttpClient(import.meta.env.VITE_API_URL)

export { HttpClient }
export * from './ApiError'
export * from './HttpError'
export * from './types'
