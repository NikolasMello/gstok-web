import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { listUsuarios } from '@/service/usuario/UsuarioService'

/** page é 0-indexado (padrão do DataGrid); a API espera Page 1-indexado. */
export function useUsuariosQuery(page: number, pageSize: number) {
  return useQuery({
    queryKey: ['usuarios', 'list', page, pageSize] as const,
    queryFn: () => listUsuarios({ page: page + 1, pageSize }),
    placeholderData: keepPreviousData,
  })
}
