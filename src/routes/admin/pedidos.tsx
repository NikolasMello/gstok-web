import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/pedidos"!</div>
}
