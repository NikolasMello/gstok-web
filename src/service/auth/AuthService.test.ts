import { describe, it, expect, vi, afterEach } from 'vitest'
import { login, register } from './AuthService'
import { httpClient } from '../http'

describe('AuthService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('login posts credentials to /auth/login without an auth header', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue({
      data: { access_token: 'token-123' },
      status: 200,
      headers: new Headers(),
    })

    const { data } = await login({ nm_email: 'a@b.com', ds_senha: '123456' })

    expect(data.access_token).toBe('token-123')
    expect(postSpy).toHaveBeenCalledWith(
      '/auth/login',
      { nm_email: 'a@b.com', ds_senha: '123456' },
      { auth: false },
    )
  })

  it('register posts credentials to /auth/register without an auth header', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue({
      data: { nm_email: 'a@b.com' },
      status: 201,
      headers: new Headers(),
    })

    const { data } = await register({ nm_email: 'a@b.com', ds_senha: '123456' })

    expect(data.nm_email).toBe('a@b.com')
    expect(postSpy).toHaveBeenCalledWith(
      '/auth/register',
      { nm_email: 'a@b.com', ds_senha: '123456' },
      { auth: false },
    )
  })
})
