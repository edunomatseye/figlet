import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/{-$categoryId}/{-$slugId}')({
  component: PostsComponent,
});

function PostsComponent() {
  const { categoryId, slugId } = Route.useParams();

  return <div>{categoryId ? `Posts in ${categoryId}` : 'All Posts'}</div>;
}
