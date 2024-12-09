# Use Node.js 20 alpine image
FROM node:20-alpine

# Install vim
RUN apk add --no-cache vim

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the backend code
COPY . .

# Build the backend (if TypeScript)
RUN npm run build

# Create an entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port (e.g., 5000)
EXPOSE 8080

# Start the backend server
CMD ["npm", "run", "start"]
