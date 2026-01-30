import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'react-demo-mfe',
      filename: 'remoteEntry.js',
      exposes: {
      './ReactDemoApp': './src/ReactDemoApp.tsx'
      },
      shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    watch:{
      usePolling: true
    }
    //cors: true,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // },
    // Serve built files alongside dev server
   // middlewareMode: false
  },
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@jgl-mui': path.resolve(__dirname, '../../workspaces/react-shared/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, '../../workspaces/agnostic-shared/jgl-ui-lib/src'),
      '@jgl-react-lib': path.resolve(__dirname, '../../workspaces/react-shared/jgl-react-lib/src')
    }
  },
  publicDir: 'dist',
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})