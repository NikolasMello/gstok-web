import LayoutPagina from '@/components/layout/LayoutPagina'

import { useCreateFornecedorMutation } from '../hooks/useCreateFornecedorMutation'
import FornecedorForm from './FornecedorForm'

export default function NovoFornecedor() {
  const createFornecedorMutation = useCreateFornecedorMutation()

  return (
    <LayoutPagina title="Novo fornecedor" maxWidth="md">
      <FornecedorForm
        mode="create"
        defaultValues={{
          cd_cnpj: '',
          nm_empresa: '',
          nm_fantasia: '',
          nm_marca: '',
          colecoes: [],
        }}
        isSubmitting={createFornecedorMutation.isPending}
        onSubmit={(value) => {
          createFornecedorMutation.mutate({
            cd_cnpj: value.cd_cnpj,
            nm_empresa: value.nm_empresa,
            nm_fantasia: value.nm_fantasia || undefined,
            nm_marca: value.nm_marca || undefined,
            nm_colecoes: value.colecoes?.length ? value.colecoes : undefined,
          })
        }}
      />
    </LayoutPagina>
  )
}
