# Use the official Node.js 14 image as a base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple server to serve the build
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000
