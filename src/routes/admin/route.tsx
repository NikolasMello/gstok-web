import { createFileRoute } from '@tanstack/react-router'
import AdminTemplate from '../../templates/AdminTemplate'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminTemplate />
}
