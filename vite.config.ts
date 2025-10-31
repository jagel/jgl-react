import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@jgl-mui': path.resolve(__dirname, './workspaces/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, './workspaces/jgl-ui-lib/src')
    }
  }
})
