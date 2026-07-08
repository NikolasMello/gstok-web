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

    const data = await client.get<{ id: number }>('/users/1')

    expect(data).toEqual({ id: 1 })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(`${baseURL}/users/1`)
    expect(init!.method).toBe('GET')
  })

  it('sends a POST request with a JSON body and Content-Type header', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }))
    const client = new HttpClient(baseURL)

    await client.post('/auth/login', { nm_email: 'a@b.com', ds_senha: '123456' })

    const [, init] = fetchMock.mock.calls[0]
    const headers = init!.headers as Headers
    expect(init!.method).toBe('POST')
    expect(init!.body).toBe(JSON.stringify({ nm_email: 'a@b.com', ds_senha: '123456' }))
    expect(headers.get('Content-Type')).toBe('application/json')
  })

  it('always includes credentials so the httpOnly session cookie is sent', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}))
    const client = new HttpClient(baseURL)

    await client.get('/me')

    const [, init] = fetchMock.mock.calls[0]
    expect(init!.credentials).toBe('include')
  })

  it('appends query params to the URL, skipping undefined values', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}))
    const client = new HttpClient(baseURL)

    await client.get('/users', {
      params: { page: 2, active: true, skip: undefined },
    })

    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe(`${baseURL}/users?page=2&active=true`)
  })

  it('throws HttpError with the parsed body when the response is not ok', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Invalid credentials' }, 400))
    const client = new HttpClient(baseURL)

    await expect(client.post('/auth/login', {})).rejects.toMatchObject({
      status: 400,
      data: { message: 'Invalid credentials' },
    })
  })

  it('returns undefined data for a 204 response', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    const client = new HttpClient(baseURL)

    const data = await client.delete('/users/1')

    expect(data).toBeUndefined()
  })

  it('rejects with HttpError on a 401 response, without retrying', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }))
    const client = new HttpClient(baseURL)

    await expect(client.get('/me')).rejects.toMatchObject({ status: 401 })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
