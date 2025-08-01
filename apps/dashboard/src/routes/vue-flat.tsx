import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/vue-flat')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/vue"!</div>;
}
