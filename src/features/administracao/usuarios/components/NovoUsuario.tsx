import { useCreateUsuarioAdminMutation } from '../hooks/useCreateUsuarioAdminMutation'
import UsuarioForm from './UsuarioForm'

export default function NovoUsuario() {
  const createUsuarioAdminMutation = useCreateUsuarioAdminMutation()

  return (
    <UsuarioForm
      mode="create"
      title="Novo usuário"
      defaultValues={{
        nm_pessoa: '',
        nm_sobrenome: '',
        nm_email: '',
        nm_email_contato: '',
        nm_telefone: '',
        cd_inscricao_nacional: '',
        ds_senha: '',
        foto: undefined,
      }}
      isSubmitting={createUsuarioAdminMutation.isPending}
      onSubmit={(value) => {
        createUsuarioAdminMutation.mutate({
          nm_email: value.nm_email,
          ds_senha: value.ds_senha,
          cd_inscricao_nacional: value.cd_inscricao_nacional,
          nm_pessoa: value.nm_pessoa,
          nm_sobrenome: value.nm_sobrenome,
          nm_telefone: value.nm_telefone,
          nm_email_contato: value.nm_email_contato,
          foto: value.foto,
        })
      }}
    />
  )
}
