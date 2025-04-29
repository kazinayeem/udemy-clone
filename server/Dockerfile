# Server Dockerfile

# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy all server code
COPY server/ .

# Build TypeScript to dist/
RUN npm run build

# Expose backend port (example: 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
