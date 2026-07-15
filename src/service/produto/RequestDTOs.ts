import type { Estacao } from '../shared/enums'

/** POST /produto é multipart/form-data; ver ProdutoService.criarProduto para o mapeamento dos campos. */
export type ProdutoCreateDto = {
  cd_sku: string
  nm_produto: string
  ds_produto?: string
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string
  tp_estacao: Estacao
  id_colecao: string
  imagens?: File[]
  captions?: string[]
  indice_imagem_principal?: number
}

export type ProdutoUpdateDto = {
  cd_sku: string
  nm_produto: string
  ds_produto?: string | null
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string | null
  tp_estacao: Estacao
  id_colecao: string
  fl_ativo?: boolean
}

export type ProdutoFiltroDto = {
  nm_produto?: string
  nm_tipo?: string
  id_colecao?: string
  id_fornecedor?: string
  tp_estacao?: Estacao
  fl_ativo?: boolean
  cd_sku?: string
}
