export interface DeleteManyImagensDto {
  ids: string[]
}

export interface ImagemOrdemDto {
  imagem_produto_id: string
  sq_ordem: number
}

export interface ReordenarImagensDto {
  ordens: ImagemOrdemDto[]
}
