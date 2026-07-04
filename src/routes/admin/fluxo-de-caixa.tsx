import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/fluxo-de-caixa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/fluxo-de-caixa"!</div>
}
