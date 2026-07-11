import { httpClient } from '../http'
import type { ItemPedidoAddDto, ItemPedidoUpdateDto, PedidoCreateDto, PedidoUpdateDto } from './RequestDTOs'
import type { ItemPedidoResponseDto, PedidoPagedResponseDto, PedidoResponseDto } from './ResponseDTOs'

export function obterPedidos(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<PedidoPagedResponseDto>('/pedido', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterPedido(id: string) {
  return httpClient.get<PedidoResponseDto>(`/pedido/${id}`)
}

export function criarPedido(payload: PedidoCreateDto) {
  return httpClient.post<PedidoResponseDto>('/pedido', payload)
}

export function atualizarPedido(id: string, payload: PedidoUpdateDto) {
  return httpClient.put<PedidoResponseDto>(`/pedido/${id}`, payload)
}

export function excluirPedido(id: string) {
  return httpClient.delete<void>(`/pedido/${id}`)
}

/** A doc do backend anota o retorno como PedidoResponseDto (não como lista de itens) — conferir o shape real ao integrar. */
export function obterItensPedido(pedidoId: string) {
  return httpClient.get<PedidoResponseDto>(`/pedido/${pedidoId}/itens`)
}

export function adicionarItemPedido(pedidoId: string, payload: ItemPedidoAddDto) {
  return httpClient.post<ItemPedidoResponseDto>(`/pedido/${pedidoId}/itens`, payload)
}

export function atualizarItemPedido(pedidoId: string, itemId: string, payload: ItemPedidoUpdateDto) {
  return httpClient.put<ItemPedidoResponseDto>(`/pedido/${pedidoId}/itens/${itemId}`, payload)
}

export function excluirItemPedido(pedidoId: string, itemId: string) {
  return httpClient.delete<void>(`/pedido/${pedidoId}/itens/${itemId}`)
}
