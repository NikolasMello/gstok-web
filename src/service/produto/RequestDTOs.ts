import type { Estacao } from '../shared/enums'

/** POST /produto é multipart/form-data; ver ProdutoService.criarProduto para o mapeamento dos campos. */
export interface ProdutoCreateDto {
  cd_sku: string
  nm_produto: string
  ds_produto?: string
  nm_marca?: string
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string
  tp_estacao: Estacao
  imagens?: File[]
  captions?: string[]
  indice_imagem_principal?: number
}

export interface ProdutoUpdateDto {
  cd_sku: string
  nm_produto: string
  ds_produto?: string | null
  nm_marca?: string | null
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string | null
  tp_estacao: Estacao
  fl_ativo?: boolean
}
