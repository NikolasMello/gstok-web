import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueryKey } from '@/context/SessionProvider'
import { login } from '@/service/auth/AuthService'

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey })
      await navigate({ to: '/admin' })
    },
    meta: { silent: true }, 
  })
}
