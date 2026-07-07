import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'
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

function handleQueryError(error: unknown, meta: Record<string, unknown> | undefined) {
  if (meta?.silent) return
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
