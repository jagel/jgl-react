# JGL Micro Frontend Setup Script
# This script sets up the development environment for all micro frontends

param(
    [Parameter(HelpMessage="Install dependencies for all applications")]
    [switch]$Install,
    
    [Parameter(HelpMessage="Start development servers for all MFEs")]
    [switch]$Dev,
    
    [Parameter(HelpMessage="Start only shell host")]
    [switch]$ShellOnly,
    
    [Parameter(HelpMessage="Start only React demo MFE")]
    [switch]$ReactDemoOnly,
    
    [Parameter(HelpMessage="Build all applications")]
    [switch]$Build,
    
    [Parameter(HelpMessage="Show available commands")]
    [switch]$Help
)

function Write-Header {
    param([string]$Message)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Yellow
}

if ($Help) {
    Write-Header "JGL Micro Frontend Setup Commands"
    Write-Host "Usage: .\scripts\setup.ps1 [OPTIONS]`n"
    Write-Host "Options:"
    Write-Host "  -Install         Install dependencies for all applications"
    Write-Host "  -Dev            Start development servers for all MFEs"
    Write-Host "  -ShellOnly      Start only shell host - port 3000"
    Write-Host "  -ReactDemoOnly  Start only React demo MFE - port 3001"
    Write-Host "  -Build          Build all applications for production"
    Write-Host "  -Help           Show this help message`n"
    
    Write-Host "Examples:"
    Write-Host "  .\scripts\setup.ps1 -Install      # Install all dependencies"
    Write-Host "  .\scripts\setup.ps1 -Dev          # Start all MFEs"
    Write-Host "  .\scripts\setup.ps1 -ShellOnly    # Start shell only"
    Write-Host "  .\scripts\setup.ps1 -Build        # Build all for production"
    return
}

if ($Install) {
    Write-Header "Installing Dependencies"
    
    Write-Info "Installing root dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install root dependencies"; exit 1 }
    Write-Success "Root dependencies installed"
    
    Write-Info "Installing shell-host dependencies..."
    Set-Location "applications\shell-host"
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install shell-host dependencies"; exit 1 }
    Write-Success "Shell-host dependencies installed"
    Set-Location "..\..\"
    
    Write-Info "Installing react-demo-mfe dependencies..."
    Set-Location "applications\react-demo-mfe"
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install react-demo-mfe dependencies"; exit 1 }
    Write-Success "React-demo-mfe dependencies installed"
    Set-Location "..\..\"
    
    Write-Success "All dependencies installed successfully!"
}

if ($Dev) {
    Write-Header "Starting All Development Servers"
    Write-Info "Shell Host will be available at: http://localhost:3000"
    Write-Info "React Demo MFE will be available at: http://localhost:3001"
    npm run dev:all
}

if ($ShellOnly) {
    Write-Header "Starting Shell Host Only"
    Write-Info "Shell Host will be available at: http://localhost:3000"
    npm run dev:shell
}

if ($ReactDemoOnly) {
    Write-Header "Starting React Demo MFE Only"
    Write-Info "React Demo MFE will be available at: http://localhost:3001"
    npm run dev:react-demo
}

if ($Build) {
    Write-Header "Building All Applications"
    npm run build:all
    if ($LASTEXITCODE -eq 0) {
        Write-Success "All applications built successfully!"
    } else {
        Write-Error "Build failed!"
        exit 1
    }
}

if (-not ($Install -or $Dev -or $ShellOnly -or $ReactDemoOnly -or $Build)) {
    Write-Header "JGL Micro Frontend Platform"
    Write-Host "No operation specified. Use -Help to see available options."
    Write-Host "Quick start: .\scripts\setup.ps1 -Install -Dev"
}