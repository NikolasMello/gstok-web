import { httpClient } from '../http'
import type { ColecaoCreateDto, ColecaoUpdateDto } from './RequestDTOs'
import type { ColecaoResponseDto } from './ResponseDTOs'

/**
 * Rota mapeada na raiz do app (sem o prefixo /api/v1) — o backend usa uma rota absoluta
 * ("/fornecedor/{fornecedorId}/colecao") que sobrescreve o prefixo de versionamento aplicado
 * aos demais endpoints do ColecaoController. Conferir se muda ao integrar.
 */
const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin

export function obterColecoesPorFornecedor(fornecedorId: string) {
  return httpClient.get<ColecaoResponseDto[]>(`${apiOrigin}/fornecedor/${fornecedorId}/colecao`)
}

export function obterColecao(id: string) {
  return httpClient.get<ColecaoResponseDto>(`/colecao/${id}`)
}

export function criarColecao(payload: ColecaoCreateDto) {
  return httpClient.post<ColecaoResponseDto>('/colecao', payload)
}

export function atualizarColecao(id: string, payload: ColecaoUpdateDto) {
  return httpClient.put<ColecaoResponseDto>(`/colecao/${id}`, payload)
}

export function excluirColecao(id: string) {
  return httpClient.delete<void>(`/colecao/${id}`)
}
