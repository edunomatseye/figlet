import { createFileRoute, getRouteApi, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { auth, authClient } from '../../../../packages/auth/src/'; // Adjust the import path as needed
import { getHeaders } from 'better-auth/client';

export const Route = createFileRoute('/about')({
  validateSearch: z.object({
    name: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    // const session = await authClient.signIn.email({
    //   email: 'test@test.com',
    //   password: '123456',
    // });
    const session = false;
    if (!session) {
      redirect({ to: '/project' });
    }
    return {
      session,
    };
  },
  loader: async ({ context }) => {
    return {
      session: context.session,
    };
  },
  component: About,
});

function About() {
  const routeApi = getRouteApi('/about');
  const navigate = routeApi.useNavigate();
  const params = Route.useParams();
  const context = Route.useLoaderData();
  return (
    <div className="p-2">
      Hello from About Table! {context?.session?.data?.user.email}
      <br />
      <button
        style={{
          marginTop: '10px',
          color: 'blue',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid blue',
          backgroundColor: 'white',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => navigate({ to: '/table', params: { postId: '1' } })}
      >
        Go to Table
      </button>
    </div>
  );
}
