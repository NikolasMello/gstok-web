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
  const formData = new FormData()
  if (payload.nm_email) formData.set('NmEmail', payload.nm_email)
  if (payload.nm_pessoa) formData.set('NmPessoa', payload.nm_pessoa)
  if (payload.nm_sobrenome) formData.set('NmSobrenome', payload.nm_sobrenome)
  if (payload.nm_telefone) formData.set('NmTelefone', payload.nm_telefone)
  if (payload.nm_email_contato) formData.set('NmEmailContato', payload.nm_email_contato)
  if (payload.foto) formData.set('Foto', payload.foto)

  return httpClient.put<UsuarioResponseDto>(`/usuario/${id}`, formData)
}

export function deleteUsuario(id: string) {
  return httpClient.delete<void>(`/usuario/${id}`)
}

/** Cria um usuário administrador; endpoint recebe multipart/form-data (PascalCase). */
export function createUsuarioAdmin(payload: UsuarioAdminCreateDto) {
  const formData = new FormData()
  formData.set('NmEmail', payload.nm_email)
  formData.set('DsSenha', payload.ds_senha)
  formData.set('CdInscricaoNacional', payload.cd_inscricao_nacional)
  formData.set('NmPessoa', payload.nm_pessoa)
  formData.set('NmSobrenome', payload.nm_sobrenome)
  formData.set('NmTelefone', payload.nm_telefone)
  formData.set('NmEmailContato', payload.nm_email_contato)
  if (payload.foto) formData.set('Foto', payload.foto)

  return httpClient.post<UsuarioResponseDto>('/usuario/admin', formData)
}
