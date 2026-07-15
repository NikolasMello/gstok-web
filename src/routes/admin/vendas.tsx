import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/vendas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /admin/vendas!</div>
}
