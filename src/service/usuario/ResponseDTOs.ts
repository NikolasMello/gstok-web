import type { PagedResult } from '../http'

export interface UsuarioSessaoResponseDto {
  nm_email: string
  nm_pessoa?: string
  nm_sobrenome?: string
  ur_avatar?: string
}

/**
 * A doc do backend não expõe o schema de resposta destes endpoints (só "OK", sem content);
 * shape inferido a partir do Create/UpdateDto — conferir ao integrar.
 */
export interface UsuarioResponseDto {
  id_usuario: string
  nm_email: string
  pessoa_id?: string | null
}

export type UsuarioPagedResponseDto = PagedResult<UsuarioResponseDto>
