import type { StatusPagamento, StatusVenda, TipoPagamento } from '../shared/enums'

export interface ItemVendaCreateDto {
  estoque_id: string
  qt_quantidade: number
}

export type ItemVendaAddDto = ItemVendaCreateDto

export interface ItemVendaUpdateDto {
  qt_quantidade: number
}

export interface VendaCreateDto {
  cliente_id: string
  tp_pagamento: TipoPagamento
  vl_frete?: number
  vl_desconto?: number
  itens: ItemVendaCreateDto[]
}

export interface VendaUpdateDto {
  st_venda: StatusVenda
  st_pagamento: StatusPagamento
  tp_pagamento: TipoPagamento
  vl_frete?: number
  vl_desconto?: number
}
