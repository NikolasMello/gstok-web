import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
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
  queryFn: () => getMe().then((response) => response.data),
  meta: { silent: true },
})

export const sessionQueryKey = sessionQueryOptions.queryKey

type SessionContextValue = {
  user: UsuarioMeResponseDto | undefined
  isAuthenticated: boolean
  isPending: boolean
  logout: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const query = useQuery(sessionQueryOptions)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const wasAuthenticated = useRef(false)

  const isAuthenticated = Boolean(query.data)

  useEffect(() => {
    if (isAuthenticated) {
      wasAuthenticated.current = true
      return
    }
    // Sessão caiu depois de já estar autenticada (ex.: refresh token expirou
    // em meio à navegação) — manda direto pro login em vez de deixar a tela
    // atual "viva" com uma sessão morta.
    if (query.isError && wasAuthenticated.current) {
      wasAuthenticated.current = false
      void navigate({ to: '/login' })
    }
  }, [isAuthenticated, query.isError, navigate])

  const logout = useCallback(async () => {
    await logoutRequest()
    queryClient.setQueryData(sessionQueryKey, undefined)
  }, [queryClient])

  const value: SessionContextValue = {
    user: query.data,
    isAuthenticated,
    isPending: query.isPending,
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
