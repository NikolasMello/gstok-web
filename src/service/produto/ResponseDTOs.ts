import type { PagedResult } from '../http'
import type { Estacao } from '../shared/enums'

/**
 * A doc do backend não expõe o schema de resposta destes endpoints (só "OK", sem content);
 * shape inferido a partir do Create/UpdateDto — conferir ao integrar.
 */
export interface ProdutoResponseDto {
  id_produto: string
  cd_sku: string
  nm_produto: string
  ds_produto?: string | null
  nm_marca?: string | null
  vl_preco: number
  vl_venda: number
  tipo_produto_id?: string | null
  tp_estacao: Estacao
  fl_ativo: boolean
  ts_criacao: string
  ts_edicao?: string | null
}

export type ProdutoPagedResponseDto = PagedResult<ProdutoResponseDto>
