# Base image
FROM node:latest AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production environment
FROM nginx:alpine

# Copy build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
