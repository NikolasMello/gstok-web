import { createFileRoute } from '@tanstack/react-router'

import NovoProduto from '@/features/operacao/produtos/components/NovoProduto'

export const Route = createFileRoute('/admin/produtos/novo')({
  component: NovoProduto,
})
