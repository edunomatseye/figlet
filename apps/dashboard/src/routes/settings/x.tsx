import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/x')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/x"!</div>
}
