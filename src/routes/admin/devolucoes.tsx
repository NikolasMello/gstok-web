import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/devolucoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/devolucoes"!</div>
}
