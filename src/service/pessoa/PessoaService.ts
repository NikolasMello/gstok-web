import { httpClient } from '../http'
import type { PessoaRequestDto } from './RequestDTOs'
import type { PessoaPagedResponseDto, PessoaResponseDto } from './ResponseDTOs'

export function obterPessoas(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<PessoaPagedResponseDto>('/pessoa', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function obterPessoa(id: string) {
  return httpClient.get<PessoaResponseDto>(`/pessoa/${id}`)
}

export function criarPessoa(payload: PessoaRequestDto) {
  return httpClient.post<PessoaResponseDto>('/pessoa', payload)
}

export function atualizarPessoa(id: string, payload: PessoaRequestDto) {
  return httpClient.put<PessoaResponseDto>(`/pessoa/${id}`, payload)
}

export function excluirPessoa(id: string) {
  return httpClient.delete<void>(`/pessoa/${id}`)
}
