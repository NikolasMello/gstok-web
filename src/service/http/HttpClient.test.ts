import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { HttpClient } from './HttpClient'

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('HttpClient', () => {
  const baseURL = 'http://localhost:5268/api/v1'
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends a GET request and returns parsed JSON', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }))
    const client = new HttpClient(baseURL)

    const { data, status } = await client.get<{ id: number }>('/users/1', { auth: false })

    expect(status).toBe(200)
    expect(data).toEqual({ id: 1 })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(`${baseURL}/users/1`)
    expect(init!.method).toBe('GET')
  })

  it('sends a POST request with a JSON body and Content-Type header', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }))
    const client = new HttpClient(baseURL)

    await client.post('/auth/login', { nm_email: 'a@b.com', ds_senha: '123456' }, { auth: false })

    const [, init] = fetchMock.mock.calls[0]
    const headers = init!.headers as Headers
    expect(init!.method).toBe('POST')
    expect(init!.body).toBe(JSON.stringify({ nm_email: 'a@b.com', ds_senha: '123456' }))
    expect(headers.get('Content-Type')).toBe('application/json')
  })

  it('attaches an Authorization header when a token is set and auth is not disabled', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}))
    const client = new HttpClient(baseURL)
    client.setToken('abc123')

    await client.get('/me')

    const [, init] = fetchMock.mock.calls[0]
    const headers = init!.headers as Headers
    expect(headers.get('Authorization')).toBe('Bearer abc123')
  })

  it('does not attach Authorization when auth: false', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}))
    const client = new HttpClient(baseURL)
    client.setToken('abc123')

    await client.get('/public', { auth: false })

    const [, init] = fetchMock.mock.calls[0]
    const headers = init!.headers as Headers
    expect(headers.get('Authorization')).toBeNull()
  })

  it('appends query params to the URL, skipping undefined values', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}))
    const client = new HttpClient(baseURL)

    await client.get('/users', {
      auth: false,
      params: { page: 2, active: true, skip: undefined },
    })

    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe(`${baseURL}/users?page=2&active=true`)
  })

  it('throws HttpError with the parsed body when the response is not ok', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Invalid credentials' }, 400))
    const client = new HttpClient(baseURL)

    await expect(client.post('/auth/login', {}, { auth: false })).rejects.toMatchObject({
      status: 400,
      data: { message: 'Invalid credentials' },
    })
  })

  it('returns undefined data for a 204 response', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    const client = new HttpClient(baseURL)

    const { data } = await client.delete('/users/1', { auth: false })

    expect(data).toBeUndefined()
  })

  it('refreshes the token on 401, retries once, and succeeds', async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(jsonResponse({ id: 1 }))

    const client = new HttpClient(baseURL)
    client.setToken('expired-token')
    client.setRefreshTokenHandler(vi.fn().mockResolvedValue('new-token'))

    const { data } = await client.get<{ id: number }>('/me')

    expect(data).toEqual({ id: 1 })
    expect(client.getToken()).toBe('new-token')
    expect(fetchMock).toHaveBeenCalledTimes(2)
    const secondCallInit = fetchMock.mock.calls[1][1]
    const secondCallHeaders = secondCallInit!.headers as Headers
    expect(secondCallHeaders.get('Authorization')).toBe('Bearer new-token')
  })

  it('clears the token and rejects pending requests when refresh fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }))
    const client = new HttpClient(baseURL)
    client.setToken('expired-token')
    const refreshError = new Error('refresh failed')
    client.setRefreshTokenHandler(vi.fn().mockRejectedValue(refreshError))
    const onRefreshFailure = vi.fn()
    client.setOnRefreshFailure(onRefreshFailure)

    await expect(client.get('/me')).rejects.toBe(refreshError)
    expect(client.getToken()).toBeNull()
    expect(onRefreshFailure).toHaveBeenCalledWith(refreshError)
  })
})
