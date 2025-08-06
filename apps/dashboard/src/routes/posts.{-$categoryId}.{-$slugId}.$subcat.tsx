import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/posts/{-$categoryId}/{-$slugId}/$subcat'
)({
  component: PostsComponent,
});

function PostsComponent() {
  const { categoryId, slugId, subcat } = Route.useParams();

  return <div>{categoryId ? `Posts in ${categoryId}` : 'All Posts'}</div>;
}
