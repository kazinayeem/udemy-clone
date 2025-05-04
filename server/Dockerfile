# Use Node.js 20 base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy entire server source code
COPY . .

# Generate Prisma client (inside Docker, correct binary for Linux)
RUN npx prisma generate

# Build TypeScript into dist/
RUN npm run build

# Copy generated Prisma client into dist folder if you use a custom output path
RUN cp -r ./generated ./dist/generated

# Expose the application port
EXPOSE 5000

# Start the app (ensure "start" script points to built app in dist/)
CMD ["npm", "start"]
