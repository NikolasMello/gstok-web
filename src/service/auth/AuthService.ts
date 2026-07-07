import { httpClient } from '../http'
import type { LoginRequestDto, RegisterRequestDto } from './RequestDTOs'
import type { LoginResponseDto, RegisterResponseDto } from './ResponseDTOs'

export function login(payload: LoginRequestDto) {
  return httpClient.post<LoginResponseDto>('/auth/login', payload)
}

export function register(payload: RegisterRequestDto) {
  return httpClient.post<RegisterResponseDto>('/auth/register', payload)
}

/** Invalida a sessão no backend (limpa o cookie httpOnly). */
export function logout() {
  return httpClient.post<void>('/auth/logout')
}
