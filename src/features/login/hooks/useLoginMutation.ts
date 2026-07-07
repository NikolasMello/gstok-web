import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '@/service/auth/AuthService'
import { sessionQueryKey } from '@/context/SessionProvider'
import type { LoginRequestDto } from '@/service/auth/RequestDTOs'

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginRequestDto) => login(payload).then((response) => response.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sessionQueryKey })
    },
    meta: { silent: true }, // erro de login é tratado inline na tela, não via snackbar global
  })
}
