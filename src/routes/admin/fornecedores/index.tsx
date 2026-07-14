import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import Fornecedores from '@/features/operacao/fornecedores/components/Fornecedores'
import {
  FORNECEDORES_PAGE_SIZE,
  fornecedoresQueryOptions,
} from '@/features/operacao/fornecedores/hooks/useFornecedoresQuery'

const fornecedoresSearchSchema = z.object({
  page: z.number().int().min(1).optional(),
})

export const Route = createFileRoute('/admin/fornecedores/')({
  validateSearch: fornecedoresSearchSchema,
  loaderDeps: ({ search: { page = 1 } }) => ({ page }),
  loader: ({ context: { queryClient }, deps: { page } }) =>
    queryClient.ensureQueryData(fornecedoresQueryOptions(page, FORNECEDORES_PAGE_SIZE)),
  component: Fornecedores,
})
