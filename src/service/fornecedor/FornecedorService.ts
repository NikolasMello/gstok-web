import { httpClient } from '../http'
import type { FornecedorCreateDto, FornecedorUpdateDto } from './RequestDTOs'
import type { FornecedorDetalheResponseDto, FornecedorPagedResponseDto, FornecedorResponseDto } from './ResponseDTOs'

export function obterFornecedores(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<FornecedorPagedResponseDto>('/fornecedor', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterFornecedor(id: string) {
  return httpClient.get<FornecedorDetalheResponseDto>(`/fornecedor/${id}`)
}

export function criarFornecedor(payload: FornecedorCreateDto) {
  return httpClient.post<FornecedorResponseDto>('/fornecedor', payload)
}

export function atualizarFornecedor(id: string, payload: FornecedorUpdateDto) {
  return httpClient.put<FornecedorResponseDto>(`/fornecedor/${id}`, payload)
}

export function excluirFornecedor(id: string) {
  return httpClient.delete<void>(`/fornecedor/${id}`)
}
