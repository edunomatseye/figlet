import {
  createFileRoute,
  getRouteApi,
  useParams,
} from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const routeApi = getRouteApi('/about');
  const navigate = routeApi.useNavigate();
  const params = useParams({ from: '/about' });
  return (
    <div className="p-2">
      Hello from About Table!
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
