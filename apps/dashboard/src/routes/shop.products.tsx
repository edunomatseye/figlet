import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const productSearchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(''),
  sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
});

type ProductSearch = z.infer<typeof productSearchSchema>;

function RouteComponent() {
  return <div>Hello "/shop/products"!</div>;
}

export const Route = createFileRoute('/shop/products')({
  validateSearch: (search) => productSearchSchema.parse(search),
  component: RouteComponent,
});
