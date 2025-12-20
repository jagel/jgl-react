# Use Node.js official image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (this will be overridden by bind mount in dev)
COPY . .

# Expose the port that Vite dev server runs on
EXPOSE 3000

# Start the Vite development server with proper host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]