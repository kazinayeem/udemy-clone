# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and lock files first to leverage Docker cache
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy all server source files
COPY server/ .

# Generate Prisma client for production (with binary targets)
RUN npx prisma generate

# Build TypeScript source to dist/
RUN npm run build

# Ensure the generated Prisma client and binaries are present
# If your prisma client is output to `generated/prisma`, make sure it's not ignored

# Expose the app port
EXPOSE 5000

# Start the application
CMD ["node", "dist/src/index.js"]
