import { afterEach,describe, expect, it, vi } from 'vitest'

import { httpClient } from '../http'
import { login, register } from './AuthService'

describe('AuthService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('login posts credentials to /auth/login', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue({ access_token: 'token-123' })

    const data = await login({ nm_email: 'a@b.com', ds_senha: '123456' })

    expect(data.access_token).toBe('token-123')
    expect(postSpy).toHaveBeenCalledWith('/auth/login', {
      nm_email: 'a@b.com',
      ds_senha: '123456',
    })
  })

  it('register posts credentials to /auth/register', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue({ nm_email: 'a@b.com' })

    const data = await register({ nm_email: 'a@b.com', nm_pessoa: 'Fulano', ds_senha: '123456' })

    expect(data.nm_email).toBe('a@b.com')
    expect(postSpy).toHaveBeenCalledWith('/auth/register', {
      nm_email: 'a@b.com',
      nm_pessoa: 'Fulano',
      ds_senha: '123456',
    })
  })
})
