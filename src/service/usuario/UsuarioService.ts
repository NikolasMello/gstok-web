import { httpClient } from '../http'
import type { UsuarioMeResponseDto } from './ResponseDTOs'

export function getMe() {
  return httpClient.get<UsuarioMeResponseDto>('/usuario/me')
}
