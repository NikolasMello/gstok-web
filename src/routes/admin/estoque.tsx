import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/estoque')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/estoque"!</div>
}
