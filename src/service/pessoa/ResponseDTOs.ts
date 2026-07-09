import type { PagedResult } from '../http'
import type { TipoPessoa } from '../shared/enums'

/**
 * A doc do backend não expõe o schema de resposta destes endpoints (só "OK", sem content);
 * shape inferido a partir do PessoaRequestDto — conferir ao integrar.
 */
export interface PessoaResponseDto {
  id_pessoa: string
  tp_pessoa: TipoPessoa
  cd_inscricao_nacional: string
  nm_pessoa: string
  nm_sobrenome: string
  nm_telefone: string
  nm_email_contato: string
}

export type PessoaPagedResponseDto = PagedResult<PessoaResponseDto>
