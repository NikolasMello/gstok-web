import { httpClient } from '../http'
import type { ProdutoCreateDto, ProdutoUpdateDto } from './RequestDTOs'
import type { ProdutoPagedResponseDto, ProdutoResponseDto } from './ResponseDTOs'

export function listProdutos(params?: { page?: number; pageSize?: number }) {
  return httpClient.get<ProdutoPagedResponseDto>('/produto', {
    params: { Page: params?.page, PageSize: params?.pageSize },
  })
}

export function getProduto(id: string) {
  return httpClient.get<ProdutoResponseDto>(`/produto/${id}`)
}

/** Endpoint recebe multipart/form-data; os nomes de campo seguem o model binding do backend (PascalCase). */
export function createProduto(payload: ProdutoCreateDto) {
  const formData = new FormData()
  formData.set('CdSku', payload.cd_sku)
  formData.set('NmProduto', payload.nm_produto)
  if (payload.ds_produto) formData.set('DsProduto', payload.ds_produto)
  if (payload.nm_marca) formData.set('NmMarca', payload.nm_marca)
  formData.set('VlPreco', String(payload.vl_preco))
  formData.set('VlVenda', String(payload.vl_venda))
  if (payload.tipo_produto_id) formData.set('TipoProdutoId', payload.tipo_produto_id)
  formData.set('TpEstacao', payload.tp_estacao)
  payload.imagens?.forEach((imagem) => formData.append('Imagens', imagem))
  payload.captions?.forEach((caption) => formData.append('Captions', caption))
  if (payload.indice_imagem_principal !== undefined) {
    formData.set('IndiceImagemPrincipal', String(payload.indice_imagem_principal))
  }

  return httpClient.post<ProdutoResponseDto>('/produto', formData)
}

export function updateProduto(id: string, payload: ProdutoUpdateDto) {
  return httpClient.put<ProdutoResponseDto>(`/produto/${id}`, payload)
}

export function deleteProduto(id: string) {
  return httpClient.delete<void>(`/produto/${id}`)
}
