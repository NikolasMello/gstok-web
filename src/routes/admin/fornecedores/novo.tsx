import { createFileRoute } from '@tanstack/react-router'

import NovoFornecedor from '@/features/operacao/fornecedores/components/NovoFornecedor'

export const Route = createFileRoute('/admin/fornecedores/novo')({
  component: NovoFornecedor,
})
