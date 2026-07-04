import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/fornecedores')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/fornecedores"!</div>
}
