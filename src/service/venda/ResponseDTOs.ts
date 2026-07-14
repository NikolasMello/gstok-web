import type { PagedResult } from '../http'
import type { StatusPagamento, StatusVenda, TamanhoRoupa, TipoPagamento } from '../shared/enums'

export interface ItemVendaResponseDto {
  id_item_venda: string
  estoque_id: string
  nm_produto: string
  tp_tamanho: TamanhoRoupa
  nm_cor: string
  qt_quantidade: number
  vl_unitario: number
  vl_total: number
}

export interface VendaResponseDto {
  id_venda: string
  cliente_id: string
  st_venda: StatusVenda
  st_pagamento: StatusPagamento
  tp_pagamento: TipoPagamento
  vl_subtotal: number
  vl_frete: number
  vl_desconto: number
  vl_total: number
  ts_criacao: string
  ts_edicao?: string | null
  itens: ItemVendaResponseDto[]
}

export type VendaPagedResponseDto = PagedResult<VendaResponseDto>
