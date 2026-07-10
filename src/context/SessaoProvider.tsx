import { createContext, useCallback, useContext, useMemo } from 'react'

import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { logout as logoutRequest } from '../service/auth/AuthService'
import type { UsuarioSessaoResponseDto } from '../service/usuario/ResponseDTOs'
import { obterUsuarioSessao } from '../service/usuario/UsuarioService'

/**
 * Compartilhado com os guards de rota (loader do /admin) via context.queryClient,
 * garantindo que ambos leiam/escrevam a mesma entrada do cache do react-query.
 */
export const sessionQueryOptions = queryOptions({
  queryKey: ['session', 'me'] as const,
  queryFn: obterUsuarioSessao,
  meta: { silent: true },
})

export const sessionQueryKey = sessionQueryOptions.queryKey

type SessionContextValue = {
  usuario: UsuarioSessaoResponseDto
  logout: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null)

type SessaoProviderProps = {
  /** Resolvido no loader da rota /admin antes do render — nunca undefined aqui. */
  usuario: UsuarioSessaoResponseDto
  children: ReactNode
}

export function SessaoProvider({ usuario, children }: SessaoProviderProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    await logoutRequest()
    queryClient.removeQueries({ queryKey: sessionQueryKey })
    await navigate({ to: '/login', replace: true })
  }, [navigate, queryClient])

  const value = useMemo<SessionContextValue>(() => ({ usuario, logout }), [usuario, logout])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessaoProvider')
  }
  return context
}
