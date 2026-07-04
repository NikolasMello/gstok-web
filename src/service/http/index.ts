import { HttpClient } from './HttpClient'

export const httpClient = new HttpClient(import.meta.env.VITE_API_URL)

httpClient.setRefreshTokenHandler(async () => {
  const { data } = await httpClient.post<{ access_token: string }>('/auth/refresh-token', undefined, {
    auth: false,
  })
  return data.access_token
})

export { HttpClient }
export * from './types'
export * from './HttpError'
export * from './ApiError'
