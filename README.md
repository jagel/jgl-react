# JGL Micro Frontend Platform

A modern micro frontend architecture built with React, TypeScript, and Module Federation (Vite). This platform enables independent development, deployment, and scaling of frontend applications while maintaining a cohesive user experience.

## 🏗️ Architecture Overview

### **Horizontal Microservices Approach**
- Each micro frontend owns complete user journeys (entire pages/workflows)
- Shell host handles authentication, routing, and shared layout
- Independent deployment and development cycles
- Framework-agnostic shared libraries

### **Project Structure**
```
jgl-react/
├── 📁 applications/                # Micro Frontend Applications
│   ├── shell-host/                # Main host application (React)
│   ├── react-demo-mfe/           # React components demo
│   └── angular-demo-mfe/          # Angular components demo (future)
│
├── 📁 workspaces/                 # Shared Libraries
│   ├── react-shared/             # React-specific libraries
│   │   ├── jgl-mui/              # MUI component library
│   │   └── jgl-react-lib/        # React utilities & hooks
│   ├── angular-shared/           # Angular-specific libraries
│   └── agnostic-shared/          # Framework-agnostic libraries
│       └── jgl-ui-lib/           # Generic UI utilities
│
├── 📁 external-mfes/             # External repository MFEs (git-ignored)
├── 📁 scripts/                   # Development automation scripts  
└── 📁 docs/                      # Documentation & change tracking
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm 8+
- PowerShell (Windows)

### **Setup & Development**
```powershell
# Clone and setup
git clone <repository-url>
cd jgl-react

# Install all dependencies
.\scripts\setup.ps1 -Install

# Start all micro frontends
.\scripts\setup.ps1 -Dev

# OR start specific applications
.\scripts\setup.ps1 -ShellOnly      # Shell host only (port 3000)
.\scripts\setup.ps1 -ReactDemoOnly  # React demo only (port 3001)
```

### **Access Points**
- **Shell Host**: http://localhost:3000
- **React Demo MFE**: http://localhost:3001 (standalone)

## 🛠️ Development Workflow

### **Available Commands**
```bash
# Root level commands
npm run dev:all           # Start all MFEs
npm run dev:shell         # Start shell host only  
npm run dev:react-demo    # Start React demo MFE only
npm run build:all         # Build all applications
npm run install:all       # Install all dependencies

# PowerShell automation
.\scripts\setup.ps1 -Help # Show all available options
```

### **Adding New Micro Frontends**
1. Create new application in `applications/` directory
2. Configure Module Federation in `vite.config.ts`
3. Update shell host to load the new MFE
4. Add scripts to root `package.json`

## 📡 Module Federation Configuration

### **Shell Host Configuration**
```typescript
// applications/shell-host/vite.config.ts
federation({
  name: 'shell-host',
  remotes: {
    'react-demo-mfe': {
      external: 'http://localhost:3001/remoteEntry.js',
      format: 'esm',
      from: 'vite'
    }
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    '@mui/material': {}
  }
})
```

## 🔐 Authentication Architecture

### **Host-Managed Authentication**
- Shell host handles SSO authentication process
- JWT tokens managed centrally
- Tokens passed to MFEs that require authentication
- Demo MFEs operate without authentication

## 🌍 Deployment Strategy

### **Environment-Based MFE Loading**
Different MFEs can be loaded per environment:
- **Development**: All MFEs including demos
- **Staging**: All MFEs for testing
- **Production**: Business MFEs only (no demos)

### **Independent Deployment**
- Each MFE can be deployed separately
- Shell host dynamically loads available MFEs
- Graceful fallback for unavailable MFEs

## 📋 Change Log

See [CHANGELOG.md](docs/CHANGELOG.md) for detailed change tracking.

## 📚 Additional Documentation

- [Architecture Details](docs/architecture.md)
- [Development Guide](docs/development-guide.md)  
- [Deployment Guide](docs/deployment-guide.md)

---

**Built with ❤️ using AI-assisted development**
