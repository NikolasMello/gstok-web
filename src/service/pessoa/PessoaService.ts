import { httpClient } from '../http'
import type { PessoaRequestDto } from './RequestDTOs'
import type { PessoaPagedResponseDto, PessoaResponseDto } from './ResponseDTOs'

export function listPessoas(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<PessoaPagedResponseDto>('/pessoa', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function getPessoa(id: string) {
  return httpClient.get<PessoaResponseDto>(`/pessoa/${id}`)
}

export function createPessoa(payload: PessoaRequestDto) {
  return httpClient.post<PessoaResponseDto>('/pessoa', payload)
}

export function updatePessoa(id: string, payload: PessoaRequestDto) {
  return httpClient.put<PessoaResponseDto>(`/pessoa/${id}`, payload)
}

export function deletePessoa(id: string) {
  return httpClient.delete<void>(`/pessoa/${id}`)
}
