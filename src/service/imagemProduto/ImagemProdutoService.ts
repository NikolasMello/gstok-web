import { httpClient } from '../http'
import type { DeleteManyImagensDto, ReordenarImagensDto } from './RequestDTOs'
import type { ImagemProdutoResponseDto } from './ResponseDTOs'

export function listImagens(produtoId: string) {
  return httpClient.get<ImagemProdutoResponseDto[]>(`/produto/${produtoId}/imagens`)
}

export function deleteImagens(produtoId: string, payload: DeleteManyImagensDto) {
  return httpClient.delete<void>(`/produto/${produtoId}/imagens`, payload)
}

export function reordenarImagens(produtoId: string, payload: ReordenarImagensDto) {
  return httpClient.put<void>(`/produto/${produtoId}/imagens/reordenar`, payload)
}

export function deleteImagem(produtoId: string, id: string) {
  return httpClient.delete<void>(`/produto/${produtoId}/imagens/${id}`)
}
