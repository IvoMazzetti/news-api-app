import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { createInertiaApp } from '@inertiajs/react'; // Import Inertia React package
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'; // Import the resolver for Inertia pages

// Define the application name from environment variables or default to 'Laravel'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Create Inertia app instance
createInertiaApp({
    title: (title) => `${title} - ${appName}`, // Set the document title
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')), // Resolve page components
    setup({ el, App, props }) {
        const root = createRoot(el); // Create a React root container
        root.render(<App {...props} />); // Render the App component with props
    },
    progress: {
        color: '#4B5563', // Set progress bar color
    },
});
