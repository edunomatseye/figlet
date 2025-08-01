import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_framework/react')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_framework/react"!</div>
}
