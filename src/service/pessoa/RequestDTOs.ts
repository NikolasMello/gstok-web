import type { TipoPessoa } from '../shared/enums'

export interface PessoaRequestDto {
  tp_pessoa: TipoPessoa
  cd_inscricao_nacional: string
  nm_pessoa: string
  nm_sobrenome: string
  nm_telefone: string
  nm_email: string
}
