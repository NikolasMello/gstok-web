import { createFileRoute } from '@tanstack/react-router'
import PageLayout from '../../components/layout/PageLayout'
import { Box } from '@mui/material'

export const Route = createFileRoute('/admin/usuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PageLayout><Box>Rota usuários</Box></PageLayout>
}
