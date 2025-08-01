import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_framework/vue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_framework/vue"!</div>
}
