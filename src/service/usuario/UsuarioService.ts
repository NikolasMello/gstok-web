import { toFormData } from '@/utilities/toFormData'

import { httpClient } from '../http'
import type { UsuarioAdminCreateDto, UsuarioCreateDto, UsuarioUpdateDto } from './RequestDTOs'
import type { UsuarioPagedResponseDto, UsuarioResponseDto } from './ResponseDTOs'

export function obterUsuarios(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<UsuarioPagedResponseDto>('/usuario', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterUsuario(id: string) {
  return httpClient.get<UsuarioResponseDto>(`/usuario/${id}`)
}

export function criarUsuario(payload: UsuarioCreateDto) {
  return httpClient.post<UsuarioResponseDto>('/usuario', payload)
}

/** Endpoint recebe multipart/form-data; os nomes de campo seguem o model binding do backend (snake_case). */
export function atualizarUsuario(id: string, payload: UsuarioUpdateDto) {
  return httpClient.put<UsuarioResponseDto>(`/usuario/${id}`, toFormData(payload))
}

export function excluirUsuario(id: string) {
  return httpClient.delete<void>(`/usuario/${id}`)
}

/** Cria um usuário administrador; endpoint recebe multipart/form-data (snake_case). */
export function criarUsuarioAdmin(payload: UsuarioAdminCreateDto) {
  return httpClient.post<UsuarioResponseDto>('/usuario/admin', toFormData(payload))
}
