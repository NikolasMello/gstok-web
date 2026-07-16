import type { PagedResult } from '../http'
import type { ImagemProdutoResponseDto, ImageVariante } from '../imagemProduto/ResponseDTOs'
import type { Estacao } from '../shared/enums'

export type ProdutoResponseDto = {
  id_produto: string
  cd_ean: string
  nm_produto: string
  ds_produto?: string | null
  nm_marca?: string | null
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string | null
  nm_tipo?: string | null
  colecao_id: string
  nm_colecao?: string | null
  tp_estacao: Estacao
  fl_ativo: boolean
  ts_criacao: string
  ts_edicao?: string | null
  imagens: ImagemProdutoResponseDto[]
}

export type ProdutoResumoResponseDto = {
  id_produto: string
  nm_produto: string
  nm_marca?: string | null
  vl_venda: number
  nm_tipo?: string | null
  nm_colecao?: string | null
  tp_estacao: Estacao
  ts_criacao: string
  avatar: ImageVariante
}

export type ProdutoPagedResponseDto = PagedResult<ProdutoResumoResponseDto>
