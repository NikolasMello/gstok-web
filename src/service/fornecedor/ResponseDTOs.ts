import type { PagedResult } from '../http'

export type FornecedorResponseDto = {
  id_fornecedor: string
  cd_cnpj: string
  nm_empresa: string
  nm_fantasia?: string | null
  nm_marca?: string | null
  ts_criacao: string
}

export type FornecedorColecaoResumoDto = {
  id_colecao: string
  nm_colecao: string
}

/** GET /fornecedor/{id} retorna esse shape mais completo (com coleções), diferente do item da listagem paginada. */
export type FornecedorDetalheResponseDto = FornecedorResponseDto & {
  colecoes: FornecedorColecaoResumoDto[]
}

export type FornecedorPagedResponseDto = PagedResult<FornecedorResponseDto>
