import { useQuery } from '@tanstack/react-query'

import { obterDadosPessoais } from '@/service/sessao/SessaoService'

export const dadosPessoaisQueryKey = ['sessao', 'dados-pessoais'] as const

/** `enabled` deve refletir se o dialog de perfil está aberto — evita buscar sem necessidade. */
export function useDadosPessoaisQuery(enabled: boolean) {
  return useQuery({
    queryKey: dadosPessoaisQueryKey,
    queryFn: obterDadosPessoais,
    enabled,
  })
}
