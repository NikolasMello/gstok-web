import { getRouteApi } from '@tanstack/react-router'

import LayoutPagina from '@/components/layout/LayoutPagina'

import { useFornecedorQuery } from '../hooks/useFornecedorQuery'
import { useUpdateFornecedorMutation } from '../hooks/useUpdateFornecedorMutation'
import FornecedorForm from './FornecedorForm'

const routeApi = getRouteApi('/admin/fornecedores/$id/editar')

export default function EditarFornecedor() {
  const { id } = routeApi.useParams()
  const { data: fornecedor } = useFornecedorQuery(id)
  const updateFornecedorMutation = useUpdateFornecedorMutation(id)

  if (!fornecedor) return null

  return (
    <LayoutPagina title="Editar fornecedor" maxWidth="md">
      <FornecedorForm
        mode="edit"
        fornecedorId={id}
        colecoesExistentes={fornecedor.colecoes}
        defaultValues={{
          cd_cnpj: fornecedor.cd_cnpj,
          nm_empresa: fornecedor.nm_empresa,
          nm_fantasia: fornecedor.nm_fantasia ?? '',
          nm_marca: fornecedor.nm_marca ?? '',
        }}
        isSubmitting={updateFornecedorMutation.isPending}
        onSubmit={(value) => {
          updateFornecedorMutation.mutate({
            cd_cnpj: value.cd_cnpj,
            nm_empresa: value.nm_empresa,
            nm_fantasia: value.nm_fantasia || undefined,
            nm_marca: value.nm_marca || undefined,
          })
        }}
      />
    </LayoutPagina>
  )
}
