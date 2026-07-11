import type { PagedResult } from '../http'

export interface FotoPessoaResponseDto {
  id_foto_pessoa: string
  nm_imagem: string
  ur_imagem: string
  largura: number
  altura: number
}

export interface UsuarioResponseDto {
  id_usuario: string
  nm_email: string
  pessoa_id?: string | null
  cd_inscricao_nacional?: string | null
  nm_pessoa: string
  nm_sobrenome?: string | null
  nm_telefone?: string | null
  nm_email_contato?: string | null
  foto?: FotoPessoaResponseDto | null
  ts_criacao: string
}

export type UsuarioPagedResponseDto = PagedResult<UsuarioResponseDto>
