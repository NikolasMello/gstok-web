import { toFormData } from '@/utilities/toFormData'

import { httpClient } from '../http'
import type { ProdutoCreateDto, ProdutoUpdateDto } from './RequestDTOs'
import type { ProdutoPagedResponseDto, ProdutoResponseDto } from './ResponseDTOs'

export function obterProdutos(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<ProdutoPagedResponseDto>('/produto', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterProduto(id: string) {
  return httpClient.get<ProdutoResponseDto>(`/produto/${id}`)
}

/** Endpoint recebe multipart/form-data; os nomes de campo seguem o model binding do backend (PascalCase). */
export function criarProduto(payload: ProdutoCreateDto) {
  return httpClient.post<ProdutoResponseDto>('/produto', toFormData(payload))
}

export function atualizarProduto(id: string, payload: ProdutoUpdateDto) {
  return httpClient.put<ProdutoResponseDto>(`/produto/${id}`, payload)
}

export function excluirProduto(id: string) {
  return httpClient.delete<void>(`/produto/${id}`)
}
