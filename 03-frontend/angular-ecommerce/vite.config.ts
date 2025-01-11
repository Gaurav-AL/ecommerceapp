import { defineConfig } from 'vite';

// Vite config file
export default {
    build: {
      ssr: false,  // Disable SSR
    },
    optimizeDeps: {
    include: ['@okta/okta-signin-widget']
    }
}


