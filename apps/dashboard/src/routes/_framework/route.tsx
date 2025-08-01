import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_framework')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_framework"! <Outlet />
    </div>
  );
}
