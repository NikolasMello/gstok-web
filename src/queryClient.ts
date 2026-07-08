import { MutationCache,QueryCache, QueryClient } from '@tanstack/react-query'

import { HttpError, isApiError } from './service/http'

type NotifyFn = (message: string) => void

/**
 * O QueryClient precisa existir fora da árvore React (para ser injetado no
 * context do router antes do primeiro render), mas o toast de erro depende
 * do NotificationProvider. Ele preenche estas funções em runtime.
 */
export const notificationHandlers: { notifyError: NotifyFn; notifyWarning: NotifyFn } = {
  notifyError: () => {},
  notifyWarning: () => {},
}

/**
 * Mesma ideia do notificationHandlers acima: preenchido em runtime por quem
 * tem acesso ao router (NotificationProvider), já que o QueryClient existe
 * fora da árvore React e não pode chamar useNavigate diretamente.
 */
export const sessionHandlers: { redirectToLogin: () => void } = {
  redirectToLogin: () => {},
}

function handleQueryError(error: unknown, meta: Record<string, unknown> | undefined) {
  if (meta?.silent) return

  // Sessão expirada/inválida em qualquer request da app: manda pro login em vez
  // de deixar a tela atual "viva" com uma sessão morta.
  if (error instanceof HttpError && error.status === 401) {
    sessionHandlers.redirectToLogin()
    return
  }

  const data = error instanceof HttpError ? error.data : undefined
  if (!isApiError(data)) return
  if (data.severidade === 'Erro') notificationHandlers.notifyError(data.mensagem)
  else notificationHandlers.notifyWarning(data.mensagem)
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => handleQueryError(error, query.meta),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => handleQueryError(error, mutation.meta),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
