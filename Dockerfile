# Use Node.js 20 (LTS) as the base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight image for serving
FROM node:20-alpine

# Install serve to host the static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]