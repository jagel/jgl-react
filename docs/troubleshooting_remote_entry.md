# Troubleshooting Remote Entry Issues

## Problem: Module Federation RemoteEntry.js Not Loading

### **Error Messages**
- `"Loading module from "http://localhost:3001/remoteEntry.js" was blocked because of a disallowed MIME type ("")"`
- `"The specifier "react-demo-mfe@http://localhost:3001/remoteEntry.js" was a bare specifier, but was not remapped to anything"`
- `"TypeError: Failed to fetch dynamically imported module"`

### **Root Cause**
The issue occurs because Vite's development server treats `/remoteEntry.js` as a SPA route and serves the `index.html` file instead of the actual JavaScript module. This happens because:

1. **Missing Build Artifacts**: The `remoteEntry.js` file is only generated during the build process, not in development mode
2. **SPA Fallback Routing**: Vite dev server redirects unknown routes to `index.html`
3. **CORS Issues**: Cross-origin requests between different ports are blocked without proper headers

### **Solution Steps**

#### **Step 1: Build the Micro Frontend**
```bash
# Navigate to the MFE directory
cd applications/react-demo-mfe

# Build the MFE to generate remoteEntry.js
npm run build
```

This generates the `dist/assets/remoteEntry.js` file that Module Federation needs.

#### **Step 2: Configure CORS Headers**
Update the MFE's `vite.config.ts` to allow cross-origin requests:

```typescript
// applications/react-demo-mfe/vite.config.ts
export default defineConfig({
  // ... other config
  server: {
    host: '0.0.0.0',
    port: 3001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
})
```

#### **Step 3: Update Shell Host Configuration**
Modify the shell host's `vite.config.ts` to point to the built file:

```typescript
// applications/shell-host/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell-host',
      remotes: {
        'react-demo-mfe': {
          external: 'http://localhost:3001/assets/remoteEntry.js', // Note: assets/ path
          from: 'vite',
          externalType: 'url'
        }
      },
      // ... shared dependencies
    })
  ],
})
```

**Key Point**: The path must be `assets/remoteEntry.js` because Vite builds place the file in the `assets/` directory.

#### **Step 4: Restart Development Servers**
```bash
# Kill existing processes and restart
npm run dev:all
```

### **Alternative Solution: Static File Server**
If the above doesn't work, you can serve the built files using a static server:

```bash
# Install http-server globally
npm install -g http-server

# Serve the built MFE files
cd applications/react-demo-mfe
http-server dist -p 3002 --cors
```

Then update the shell host configuration to use port 3002:
```typescript
external: 'http://localhost:3002/assets/remoteEntry.js'
```

### **Development Workflow**
For ongoing development with Module Federation:

1. **Initial Setup**: Build all MFEs once to generate remoteEntry.js files
2. **MFE Development**: When making changes to MFEs, rebuild them: `npm run build`
3. **Shell Development**: Shell host development server will automatically pick up changes
4. **Production**: All applications should be built for production deployment

### **Verification Steps**
1. **Check File Existence**: Verify `http://localhost:3001/assets/remoteEntry.js` returns JavaScript (not HTML)
2. **Test CORS**: Ensure no CORS errors in browser console
3. **Module Loading**: Confirm the MFE loads correctly in the shell host

### **Common Mistakes**
- ❌ Using `/remoteEntry.js` instead of `/assets/remoteEntry.js`
- ❌ Forgetting to build the MFE before testing
- ❌ Missing CORS configuration
- ❌ Using wrong port numbers in configuration

### **Quick Fix Commands**
```bash
# Complete fix sequence
cd applications/react-demo-mfe
npm run build
cd ../shell-host
# Verify external path uses 'assets/remoteEntry.js'
npm run dev
```

---

**Last Updated**: January 26, 2026  
**Fixed By**: AI-assisted development with Module Federation troubleshooting