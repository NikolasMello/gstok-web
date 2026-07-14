import { createFileRoute } from '@tanstack/react-router'

import EditarFornecedor from '@/features/operacao/fornecedores/components/EditarFornecedor'
import { fornecedorQueryOptions } from '@/features/operacao/fornecedores/hooks/useFornecedorQuery'

export const Route = createFileRoute('/admin/fornecedores/$id/editar')({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(fornecedorQueryOptions(id)),
  component: EditarFornecedor,
})
