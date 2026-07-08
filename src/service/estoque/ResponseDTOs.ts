import type { TamanhoRoupa } from '../shared/enums'

/**
 * A doc do backend não expõe o schema de resposta deste endpoint (só "OK", sem content);
 * shape inferido a partir do Create/UpdateDto — conferir ao integrar.
 */
export interface EstoqueResponseDto {
  id_estoque: string
  produto_id: string
  qt_estoque: number
  tp_tamanho: TamanhoRoupa
  nm_cor: string
}
