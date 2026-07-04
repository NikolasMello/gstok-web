import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/clientes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/clientes"!</div>
}
