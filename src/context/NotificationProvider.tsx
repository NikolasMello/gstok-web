import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { AlertColor, SlideProps,SnackbarCloseReason } from '@mui/material'
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material'

import { notificationHandlers, sessionHandlers } from '../queryClient'

type NotifyOptions = {
  title?: string
  autoHideDuration?: number
}

type QueuedNotification = {
  key: number
  message: string
  severity: AlertColor
  title?: string
  autoHideDuration: number
}

type NotificationContextValue = {
  notifySuccess: (message: string, options?: NotifyOptions) => void
  notifyError: (message: string, options?: NotifyOptions) => void
  notifyWarning: (message: string, options?: NotifyOptions) => void
  notifyInfo: (message: string, options?: NotifyOptions) => void
}

const DEFAULT_AUTO_HIDE_DURATION = 5000

const NotificationContext = createContext<NotificationContextValue | null>(null)

function SlideUpTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [queue, setQueue] = useState<QueuedNotification[]>([])
  const [open, setOpen] = useState(false)
  const current = queue[0] ?? null

  const enqueue = useCallback(
    (severity: AlertColor, message: string, options?: NotifyOptions) => {
      setQueue((prev) => [
        ...prev,
        {
          key: Date.now() + Math.random(),
          message,
          severity,
          title: options?.title,
          autoHideDuration: options?.autoHideDuration ?? DEFAULT_AUTO_HIDE_DURATION,
        },
      ])
      setOpen(true)
    },
    [],
  )

  const handleClose = useCallback((_event?: unknown, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }, [])

  // Runs after the closing transition finishes: drop the notification that
  // just closed and, if another is queued behind it, open the Snackbar again.
  const handleExited = useCallback(() => {
    setQueue((prev) => prev.slice(1))
    setOpen(queue.length > 1)
  }, [queue])

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifySuccess: (message, options) => enqueue('success', message, options),
      notifyError: (message, options) => enqueue('error', message, options),
      notifyWarning: (message, options) => enqueue('warning', message, options),
      notifyInfo: (message, options) => enqueue('info', message, options),
    }),
    [enqueue],
  )

  // Conecta o cache de erros do react-query (queryClient.ts) aos toasts:
  // ele não tem acesso a este contexto, então escreve em um objeto mutável.
  useEffect(() => {
    notificationHandlers.notifyError = value.notifyError
    notificationHandlers.notifyWarning = value.notifyWarning
  }, [value])

  // Mesma ponte, agora para o redirect de sessão expirada (qualquer 401 global,
  // ver queryClient.ts): o QueryClient não tem acesso ao router.
  useEffect(() => {
    sessionHandlers.redirectToLogin = () => {
      void navigate({ to: '/login', replace: true })
    }
  }, [navigate])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        key={current?.key}
        open={open}
        autoHideDuration={current?.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slots={{ transition: SlideUpTransition }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Alert
          onClose={() => handleClose()}
          severity={current?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {current?.title && <AlertTitle>{current.title}</AlertTitle>}
          {current?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
