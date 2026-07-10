import { getRouteApi } from '@tanstack/react-router'

import LayoutPagina from '@/components/layout/LayoutPagina'

import { useUpdateUsuarioMutation } from '../hooks/useUpdateUsuarioMutation'
import { useUsuarioQuery } from '../hooks/useUsuarioQuery'
import UsuarioForm from './UsuarioForm'

const routeApi = getRouteApi('/admin/usuarios/$id/editar')

export default function EditarUsuario() {
  const { id } = routeApi.useParams()
  const { data: usuario } = useUsuarioQuery(id)
  const updateUsuarioMutation = useUpdateUsuarioMutation(id)

  if (!usuario) return null

  return (
    <LayoutPagina title="Editar usuário" maxWidth="md">
      <UsuarioForm
        mode="edit"
        fotoUrlAtual={usuario.foto?.ur_imagem}
        defaultValues={{
          nm_pessoa: usuario.nm_pessoa,
          nm_sobrenome: usuario.nm_sobrenome ?? '',
          nm_email: usuario.nm_email,
          nm_email_contato: usuario.nm_email_contato ?? '',
          nm_telefone: usuario.nm_telefone ?? '',
          cd_inscricao_nacional: usuario.cd_inscricao_nacional ?? '',
          ds_senha: '',
          foto: undefined,
        }}
        isSubmitting={updateUsuarioMutation.isPending}
        onSubmit={(value) => {
          updateUsuarioMutation.mutate({
            nm_email: value.nm_email,
            nm_pessoa: value.nm_pessoa,
            nm_sobrenome: value.nm_sobrenome,
            nm_telefone: value.nm_telefone,
            nm_email_contato: value.nm_email_contato,
            cd_inscricao_nacional: value.cd_inscricao_nacional || undefined,
            foto: value.foto,
          })
        }}
      />
    </LayoutPagina>
  )
}
