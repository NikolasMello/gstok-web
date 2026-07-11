import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sessionQueryKey } from '@/context/SessaoProvider'
import { atualizarDadosPessoais } from '@/service/sessao/SessaoService'

import { dadosPessoaisQueryKey } from './useDadosPessoaisQuery'

export function useAtualizarDadosPessoaisMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: atualizarDadosPessoais,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: dadosPessoaisQueryKey })
      // nm_pessoa/nm_sobrenome/foto também aparecem no menu lateral (useSession) — mantém em sincronia.
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey })
    },
  })
}
