import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@jgl-mui': path.resolve(__dirname, './workspaces/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, './workspaces/jgl-ui-lib/src'),
      '@jgl-react-lib': path.resolve(__dirname, './workspaces/jgl-react-lib/src')
    }
  }
})
