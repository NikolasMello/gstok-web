import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { obterUsuarios } from '@/service/usuario/UsuarioService'

export const USUARIOS_PAGE_SIZE = 6

/** Compartilhado com o loader da rota (context.queryClient.ensureQueryData) e o componente. */
export function usuariosQueryOptions(page: number, pageSize: number = USUARIOS_PAGE_SIZE) {
  return queryOptions({
    queryKey: ['usuarios', 'list', page, pageSize] as const,
    queryFn: () => obterUsuarios({ page, pageSize }),
    placeholderData: keepPreviousData,
  })
}

export function useUsuariosQuery(page: number, pageSize: number = USUARIOS_PAGE_SIZE) {
  return useQuery(usuariosQueryOptions(page, pageSize))
}
