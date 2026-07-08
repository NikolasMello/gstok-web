import type { TamanhoRoupa } from '../shared/enums'

export interface EstoqueCreateDto {
  qt_estoque: number
  tp_tamanho: TamanhoRoupa
  nm_cor: string
}

export interface EstoqueUpdateDto {
  qt_estoque: number
  tp_tamanho: TamanhoRoupa
  nm_cor: string
}
