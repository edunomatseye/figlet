import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId/edit')({
  // In a loader
  loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  // In a component!
  const { postId } = Route.useParams();
  return (
    <div>
      Form Edit ID: {postId} <br />
      <Outlet />
    </div>
  );
}

function fetchPost(postId: string) {
  return {
    postId,
  };
}
