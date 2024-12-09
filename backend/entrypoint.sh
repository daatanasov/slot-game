#!/bin/sh

# Wait for PostgreSQL to be ready
while ! pg_isready -h postgres -p 5432 > /dev/null 2>&1; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 1
done

# Run database migrations
npx prisma migrate deploy

# Start the application
npm run start