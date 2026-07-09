import { toFormData } from '@/utilities/toFormData'

import { httpClient } from '../http'
import type { UsuarioAdminCreateDto, UsuarioCreateDto, UsuarioUpdateDto } from './RequestDTOs'
import type {
  UsuarioPagedResponseDto,
  UsuarioResponseDto,
  UsuarioSessaoResponseDto,
} from './ResponseDTOs'

export function obterUsuarioSessao() {
  return httpClient.get<UsuarioSessaoResponseDto>('/usuario/sessao')
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

/** Endpoint recebe multipart/form-data; os nomes de campo seguem o model binding do backend (PascalCase). */
export function updateUsuario(id: string, payload: UsuarioUpdateDto) {
  return httpClient.put<UsuarioResponseDto>(`/usuario/${id}`, toFormData(payload))
}

export function deleteUsuario(id: string) {
  return httpClient.delete<void>(`/usuario/${id}`)
}

/** Cria um usuário administrador; endpoint recebe multipart/form-data (PascalCase). */
export function createUsuarioAdmin(payload: UsuarioAdminCreateDto) {
  return httpClient.post<UsuarioResponseDto>('/usuario/admin', toFormData(payload))
}
