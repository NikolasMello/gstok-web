import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterUsuario } from '@/service/usuario/UsuarioService'

/** Compartilhado com o loader da rota de edição (context.queryClient.ensureQueryData) e o componente. */
export function usuarioQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['usuarios', 'detail', id] as const,
    queryFn: () => obterUsuario(id),
  })
}

export function useUsuarioQuery(id: string) {
  return useQuery(usuarioQueryOptions(id))
}
