import { httpClient } from '../http'
import type { LoginRequestDto, RegisterRequestDto } from './RequestDTOs'

/** Autentica via cookie httpOnly; a API não retorna corpo na resposta. */
export function login(payload: LoginRequestDto) {
  return httpClient.post<void>('/auth/login', payload)
}

/** A API não retorna corpo na resposta. */
export function register(payload: RegisterRequestDto) {
  return httpClient.post<void>('/auth/register', payload)
}

/** Invalida a sessão no backend (limpa o cookie httpOnly). */
export function logout() {
  return httpClient.post<void>('/auth/logout')
}
