import type { PagedResult } from '../http'
import type { StatusPagamento, StatusPedido, TamanhoRoupa, TipoPagamento } from '../shared/enums'

export interface ItemPedidoResponseDto {
  id_item_pedido: string
  estoque_id: string
  nm_produto: string
  tp_tamanho: TamanhoRoupa
  nm_cor: string
  qt_quantidade: number
  vl_unitario: number
  vl_total: number
}

export interface PedidoResponseDto {
  id_pedido: string
  cliente_id: string
  st_pedido: StatusPedido
  st_pagamento: StatusPagamento
  tp_pagamento: TipoPagamento
  vl_subtotal: number
  vl_frete: number
  vl_desconto: number
  vl_total: number
  ts_criacao: string
  ts_edicao?: string | null
  itens: ItemPedidoResponseDto[]
}

export type PedidoPagedResponseDto = PagedResult<PedidoResponseDto>
