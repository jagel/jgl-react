# Use Node.js official image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for development)
# Clear npm cache and do fresh install
RUN npm cache clean --force && npm install --include=dev

# Copy the rest of the application code (this will be overridden by bind mount in dev)
COPY . .

# Install dependencies using the root install script which handles all applications
RUN npm run install:all

# Expose the port that Vite dev server runs on
EXPOSE 3000

# Start all microfrontends in development mode using npx
CMD ["npx", "concurrently", "npm run dev:shell", "npm run dev:react-demo"]