import path from 'node:path'; // Use 'node:' prefix for built-in modules in ESM
import { fileURLToPath } from 'node:url'; // Function to convert URL to file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: If you use library-specific PostCSS/Tailwind configuration then you should remove the `postcssConfig` build
// option from your application's configuration (i.e. project.json).
//
// See: https://nx.dev/guides/using-tailwind-css-in-react#step-4:-applying-configuration-to-libraries

export default {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
