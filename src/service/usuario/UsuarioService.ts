import { httpClient } from '../http'
import type { UsuarioCreateDto, UsuarioUpdateDto } from './RequestDTOs'
import type { UsuarioMeResponseDto, UsuarioPagedResponseDto, UsuarioResponseDto } from './ResponseDTOs'

export function getMe() {
  return httpClient.get<UsuarioMeResponseDto>('/usuario/me')
}

export function listUsuarios(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<UsuarioPagedResponseDto>('/usuario', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function getUsuario(id: string) {
  return httpClient.get<UsuarioResponseDto>(`/usuario/${id}`)
}

export function createUsuario(payload: UsuarioCreateDto) {
  return httpClient.post<UsuarioResponseDto>('/usuario', payload)
}

export function updateUsuario(id: string, payload: UsuarioUpdateDto) {
  return httpClient.put<UsuarioResponseDto>(`/usuario/${id}`, payload)
}

export function deleteUsuario(id: string) {
  return httpClient.delete<void>(`/usuario/${id}`)
}
