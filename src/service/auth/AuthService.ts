import { httpClient } from '../http'
import type { LoginRequestDto, RegisterRequestDto } from './RequestDTOs'
import type { LoginResponseDto, RegisterResponseDto } from './ResponseDTOs'

export function login(payload: LoginRequestDto) {
  return httpClient.post<LoginResponseDto>('/auth/login', payload, { auth: false })
}

export function register(payload: RegisterRequestDto) {
  return httpClient.post<RegisterResponseDto>('/auth/register', payload, { auth: false })
}

/** Renova o access token a partir do refresh token (cookie httpOnly enviado automaticamente). */
export function refreshToken() {
  return httpClient.post<LoginResponseDto>('/auth/refresh-token', undefined, { auth: false })
}

/**
 * Invalida a sessão no backend (limpa o cookie de refresh).
 * Quem chamar deve também rodar `httpClient.setToken(null)` para limpar o Bearer em memória.
 */
export function logout() {
  return httpClient.post<void>('/auth/logout')
}
