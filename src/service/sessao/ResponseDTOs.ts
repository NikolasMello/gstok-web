import type { FotoPessoaResponseDto } from '../usuario/ResponseDTOs'

export interface SessaoResponseDto {
  nm_email: string
  nm_pessoa?: string
  nm_sobrenome?: string
  ur_avatar?: string
}

/**
 * A doc do backend não expõe o schema de resposta deste endpoint (só "OK", sem content);
 * shape inferido a partir do UpdateDto — conferir ao integrar.
 */
export interface SessaoDadosPessoaisResponseDto {
  nm_pessoa?: string
  nm_sobrenome?: string
  nm_telefone?: string
  nm_email_contato?: string
  foto?: FotoPessoaResponseDto | null
}
