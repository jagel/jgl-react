import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configure the development server to listen on all network interfaces. Docker requires this to access the server from outside the container.
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  // Configure path aliases
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@jgl-mui': path.resolve(__dirname, './workspaces/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, './workspaces/jgl-ui-lib/src'),
      '@jgl-react-lib': path.resolve(__dirname, './workspaces/jgl-react-lib/src')
    }
  }
})
