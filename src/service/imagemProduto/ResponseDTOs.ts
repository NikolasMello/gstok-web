export interface ImageVariante {
  url: string
  largura: number
  altura: number
}

export interface ImagemProdutoResponseDto {
  id_imagem_produto: string
  ds_caption?: string | null
  sq_ordem: number
  fl_principal: boolean
  avatar: ImageVariante
  thumbnail: ImageVariante
  mobile: ImageVariante
  tablet: ImageVariante
  desktop: ImageVariante
}
