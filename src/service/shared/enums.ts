/** 'Todas' é para produtos sem sazonalidade (ex.: meias genéricas) — não confundir com "sem filtro" na UI de busca. */
export type Estacao = 'Inverno' | 'Verao' | 'Todas'

export type TamanhoRoupa = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XGG'

export type TipoPagamento = 'Pix' | 'Cartao' | 'Boleto'

export type TipoPessoa = 'F' | 'J'

export type StatusVenda = 'Pendente' | 'Confirmado' | 'EmSeparacao' | 'Enviado' | 'Entregue' | 'Cancelado'

export type StatusPagamento = 'Pendente' | 'Pago' | 'Reembolsado' | 'Cancelado'
