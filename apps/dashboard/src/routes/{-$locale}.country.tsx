import { createFileRoute } from '@tanstack/react-router';

// Route: /{-$locale}/about
export const Route = createFileRoute('/{-$locale}/country')({
  component: AboutComponent,
});

function AboutComponent() {
  const { locale } = Route.useParams();

  const locales = ['en', 'fr', 'es'] as const;
  type Locale = (typeof locales)[number];
  const currentLocale = (
    locales && locales.includes(locale as Locale) ? locale : 'en'
  ) as Locale;

  const content: Record<Locale, { title: string; description: string }> = {
    en: { title: 'About Us', description: 'Learn more about our company.' },
    fr: {
      title: 'À Propos',
      description: 'En savoir plus sur notre entreprise.',
    },
    es: {
      title: 'Acerca de',
      description: 'Conoce más sobre nuestra empresa.',
    },
  };

  return (
    <div>
      <h1>{content[currentLocale]?.title}</h1>
      <p>{content[currentLocale]?.description}</p>
    </div>
  );
}
