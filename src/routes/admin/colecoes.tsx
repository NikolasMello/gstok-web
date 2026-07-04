import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/colecoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/colecoes"!</div>
}
