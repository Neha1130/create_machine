# Use a node base image
FROM node:18-alpine3.16 as builder

# Set the working directory
WORKDIR /virtual_machine_client

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire app directory
COPY . .

# Build the application
RUN npm run build

# Use an Nginx base image
FROM nginx:1.21.3-alpine

# Copy the build files to the Nginx server
COPY --from=builder /virtual_machine_client/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


