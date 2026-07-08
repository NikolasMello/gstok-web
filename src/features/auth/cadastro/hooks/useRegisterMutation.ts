import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { register } from '@/service/auth/AuthService'

export function useRegisterMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await navigate({ to: '/login' })
    },
    meta: { silent: true }, // erro de cadastro é tratado inline na tela, não via snackbar global
  })
}
