import { useEffect } from 'react'
import { queryClient } from '../queryClient'
import { HttpError, isApiError } from '../service/http'
import { useNotification } from './NotificationContext'

export function QueryErrorBridge() {
  const { notifyError, notifyWarning } = useNotification()

  useEffect(() => {
    const handle = (error: unknown, meta?: Record<string, unknown>) => {
      if (meta?.silent) return
      const data = error instanceof HttpError ? error.data : undefined
      if (!isApiError(data)) return
      if (data.severidade === 'Erro') notifyError(data.mensagem)
      else notifyWarning(data.mensagem)
    }

    queryClient.getQueryCache().config.onError = (error, query) => handle(error, query.meta)
    queryClient.getMutationCache().config.onError = (error, _v, _c, mutation) =>
      handle(error, mutation.meta)
  }, [notifyError, notifyWarning])

  return null
}
