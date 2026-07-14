import { httpClient } from '../http'
import type { ItemVendaAddDto, ItemVendaUpdateDto, VendaCreateDto, VendaUpdateDto } from './RequestDTOs'
import type { ItemVendaResponseDto, VendaPagedResponseDto, VendaResponseDto } from './ResponseDTOs'

export function obterVendas(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<VendaPagedResponseDto>('/venda', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterVenda(id: string) {
  return httpClient.get<VendaResponseDto>(`/venda/${id}`)
}

export function criarVenda(payload: VendaCreateDto) {
  return httpClient.post<VendaResponseDto>('/venda', payload)
}

export function atualizarVenda(id: string, payload: VendaUpdateDto) {
  return httpClient.put<VendaResponseDto>(`/venda/${id}`, payload)
}

export function excluirVenda(id: string) {
  return httpClient.delete<void>(`/venda/${id}`)
}

/** A doc do backend anota o retorno como VendaResponseDto (não como lista de itens) — conferir o shape real ao integrar. */
export function obterItensVenda(vendaId: string) {
  return httpClient.get<VendaResponseDto>(`/venda/${vendaId}/itens`)
}

export function adicionarItemVenda(vendaId: string, payload: ItemVendaAddDto) {
  return httpClient.post<ItemVendaResponseDto>(`/venda/${vendaId}/itens`, payload)
}

export function atualizarItemVenda(vendaId: string, itemId: string, payload: ItemVendaUpdateDto) {
  return httpClient.put<ItemVendaResponseDto>(`/venda/${vendaId}/itens/${itemId}`, payload)
}

export function excluirItemVenda(vendaId: string, itemId: string) {
  return httpClient.delete<void>(`/venda/${vendaId}/itens/${itemId}`)
}
