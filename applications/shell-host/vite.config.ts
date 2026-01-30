import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell-host',
      remotes: {
        'react-demo-mfe': {
          external: 'http://localhost:3001/assets/remoteEntry.js',
          from: 'vite',
          externalType: 'url'
        }
      },
      shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
      // shared: {
      //   react: { singleton: true },
      //   'react-dom': { singleton: true },
      //   '@mui/material': {},
      //   '@emotion/react': { singleton: true },
      //   '@emotion/styled': { singleton: true }
      // }
    })
  ],
  // Configure the development server to listen on all network interfaces. Docker requires this to access the server from outside the container.
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    watch: {
      usePolling: true,
    },
  },
  // Configure path aliases
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@jgl-mui': path.resolve(__dirname, '../../workspaces/react-shared/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, '../../workspaces/agnostic-shared/jgl-ui-lib/src'),
      '@jgl-react-lib': path.resolve(__dirname, '../../workspaces/react-shared/jgl-react-lib/src')
    }
  },
  build: {
    target: 'esnext'
  }
})
