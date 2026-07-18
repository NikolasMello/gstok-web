import { httpClient } from '../http'
import type { TipoProdutoCreateDto, TipoProdutoUpdateDto } from './RequestDTOs'
import type { TipoProdutoResponseDto } from './ResponseDTOs'

export function obterTiposProduto() {
  return httpClient.get<TipoProdutoResponseDto[]>('/tipo-produto')
}

export function obterTipoProduto(id: string) {
  return httpClient.get<TipoProdutoResponseDto>(`/tipo-produto/${id}`)
}

export function criarTipoProduto(payload: TipoProdutoCreateDto) {
  return httpClient.post<TipoProdutoResponseDto>('/tipo-produto', payload)
}

export function atualizarTipoProduto(id: string, payload: TipoProdutoUpdateDto) {
  return httpClient.put<TipoProdutoResponseDto>(`/tipo-produto/${id}`, payload)
}

export function excluirTipoProduto(id: string) {
  return httpClient.delete<void>(`/tipo-produto/${id}`)
}
