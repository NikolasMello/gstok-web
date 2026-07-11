import { httpClient } from '../http'
import type { EstoqueCreateDto, EstoqueUpdateDto } from './RequestDTOs'
import type { EstoqueResponseDto } from './ResponseDTOs'

export function obterEstoques(produtoId: string) {
  return httpClient.get<EstoqueResponseDto[]>(`/produto/${produtoId}/estoque`)
}

export function obterEstoque(produtoId: string, id: string) {
  return httpClient.get<EstoqueResponseDto>(`/produto/${produtoId}/estoque/${id}`)
}

export function criarEstoque(produtoId: string, payload: EstoqueCreateDto) {
  return httpClient.post<EstoqueResponseDto>(`/produto/${produtoId}/estoque`, payload)
}

export function atualizarEstoque(produtoId: string, id: string, payload: EstoqueUpdateDto) {
  return httpClient.put<EstoqueResponseDto>(`/produto/${produtoId}/estoque/${id}`, payload)
}

export function excluirEstoque(produtoId: string, id: string) {
  return httpClient.delete<void>(`/produto/${produtoId}/estoque/${id}`)
}
