import { afterEach,describe, expect, it, vi } from 'vitest'

import { httpClient } from '../http'
import { login, register } from './AuthService'

describe('AuthService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('login posts credentials to /auth/login', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue(undefined)

    await login({ nm_email: 'a@b.com', ds_senha: '123456' })

    expect(postSpy).toHaveBeenCalledWith('/auth/login', {
      nm_email: 'a@b.com',
      ds_senha: '123456',
    })
  })

  it('register posts credentials to /auth/register', async () => {
    const postSpy = vi.spyOn(httpClient, 'post').mockResolvedValue(undefined)

    await register({ nm_email: 'a@b.com', nm_pessoa: 'Fulano', ds_senha: '123456' })

    expect(postSpy).toHaveBeenCalledWith('/auth/register', {
      nm_email: 'a@b.com',
      nm_pessoa: 'Fulano',
      ds_senha: '123456',
    })
  })
})
