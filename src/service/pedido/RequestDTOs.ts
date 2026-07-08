import type { StatusPagamento, StatusPedido, TipoPagamento } from '../shared/enums'

export interface ItemPedidoCreateDto {
  estoque_id: string
  qt_quantidade: number
}

export type ItemPedidoAddDto = ItemPedidoCreateDto

export interface ItemPedidoUpdateDto {
  qt_quantidade: number
}

export interface PedidoCreateDto {
  cliente_id: string
  tp_pagamento: TipoPagamento
  vl_frete?: number
  vl_desconto?: number
  itens: ItemPedidoCreateDto[]
}

export interface PedidoUpdateDto {
  st_pedido: StatusPedido
  st_pagamento: StatusPagamento
  tp_pagamento: TipoPagamento
  vl_frete?: number
  vl_desconto?: number
}
