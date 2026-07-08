import { createContext, useCallback, useContext } from 'react'
import type { ReactNode } from 'react'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMe } from '../service/usuario/UsuarioService'
import type { UsuarioMeResponseDto } from '../service/usuario/ResponseDTOs'
import { logout as logoutRequest } from '../service/auth/AuthService'

/**
 * Compartilhado com os guards de rota (beforeLoad) via context.queryClient,
 * garantindo que ambos leiam/escrevam a mesma entrada do cache do react-query.
 */
export const sessionQueryOptions = queryOptions({
  queryKey: ['session', 'me'] as const,
  queryFn: getMe,
  meta: { silent: true },
})

export const sessionQueryKey = sessionQueryOptions.queryKey

type SessionContextValue = {
  user: UsuarioMeResponseDto | undefined
  isAuthenticated: boolean
  /** true só na primeira carga (sem dado em cache ainda) — use pra gatear UI que depende da sessão. */
  isLoading: boolean
  /** true em qualquer busca em andamento, incluindo revalidações em background. */
  isFetching: boolean
  logout: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const query = useQuery(sessionQueryOptions)
  const queryClient = useQueryClient()

  const logout = useCallback(async () => {
    await logoutRequest()
    queryClient.setQueryData(sessionQueryKey, undefined)
  }, [queryClient])

  const value: SessionContextValue = {
    user: query.data,
    // Sem useEffect: a própria query já basta — com dado, sessão ativa; sem dado (401), inativa.
    isAuthenticated: Boolean(query.data),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    logout,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
