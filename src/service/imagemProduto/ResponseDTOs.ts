/**
 * A doc do backend não expõe o schema de resposta deste endpoint (só "OK", sem content);
 * shape inferido a partir das convenções do restante da API — conferir ao integrar.
 */
export interface ImagemProdutoResponseDto {
  id_imagem_produto: string
  produto_id: string
  ur_imagem: string
  ds_caption?: string | null
  sq_ordem: number
  fl_principal: boolean
}
