import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import path from 'node:path'; // Use 'node:' prefix for built-in modules in ESM
import { fileURLToPath } from 'node:url'; // Function to convert URL to file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
