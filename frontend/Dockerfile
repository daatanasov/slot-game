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

# Copy the rest of the frontend code
COPY . .

# Build the Next.js application
RUN npm run build

# Verify build artifacts exist
RUN ls -la .next

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["npm","run", "start"]
