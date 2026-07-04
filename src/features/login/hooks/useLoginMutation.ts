import { useMutation } from '@tanstack/react-query'
import { login } from '@/service/auth/AuthService'
import { httpClient } from '@/service/http'
import type { LoginRequestDto } from '@/service/auth/RequestDTOs'

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginRequestDto) => login(payload).then((response) => response.data),
    onSuccess: (data) => {
      httpClient.setToken(data.access_token)
    },
    meta: { silent: true }, // erro de login é tratado inline na tela, não via snackbar global
  })
}
