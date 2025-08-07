import {
  createRootRoute,
  Link,
  MatchRoute,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/project" className="[&.active]:font-bold" preload="intent">
          Project
        </Link>{' '}
        <Link
          to="/posts/$postId"
          params={{ postId: '4' }}
          search={{
            q: 'test',
          }}
          className="[&.active]:font-bold"
        >
          Post 4
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About Table
          <MatchRoute to="/about" pending>
            {(match) => <Spinner show={!!match} />}
          </MatchRoute>
        </Link>
        <Link
          to="/posts/{-$categoryId}/{-$slugId}/$subcat"
          params={{ subcat: 'hello', categoryId: undefined, slugId: undefined }}
          preload="intent"
          className="[&.active]:font-bold"
        >
          {({ isActive }) => (isActive ? 'Active SubCat Post' : 'SubCat Post')}
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

function Spinner({ show }: { show: boolean }) {
  return show ? <div>Loading...</div> : null;
}
