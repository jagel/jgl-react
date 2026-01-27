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
        './ReactDemoApp': './src/ReactDemoApp'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@mui/material': {},
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true }
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    cors: true,
    watch: {
      usePolling: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    middlewareMode: false,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@jgl-mui': path.resolve(__dirname, '../../workspaces/react-shared/jgl-mui/src'),
      '@jgl-ui-lib': path.resolve(__dirname, '../../workspaces/agnostic-shared/jgl-ui-lib/src'),
      '@jgl-react-lib': path.resolve(__dirname, '../../workspaces/react-shared/jgl-react-lib/src')
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        minifyInternalExports: false
      }
    }
  }
})