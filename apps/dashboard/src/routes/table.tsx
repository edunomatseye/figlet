import { createFileRoute } from '@tanstack/react-router';
import { PostsTable } from './-components/post-table';
import { PostsHeader } from './-components/header';
import { PostsFooter } from './-components/footer';

export const Route = createFileRoute('/table')({
  loader: () => fetchPosts(),
  component: PostComponent,
});

function PostComponent() {
  const posts = Route.useLoaderData();

  return (
    <div>
      <PostsHeader />
      <PostsTable posts={posts} />
      <PostsFooter />
    </div>
  );
}

function fetchPosts() {
  return [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
  ];
}
