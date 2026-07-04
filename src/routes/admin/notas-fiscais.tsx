import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/notas-fiscais')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/notas-fiscais"!</div>
}
