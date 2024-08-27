#!/bin/sh
set -e

# Set the Python path
export PYTHONPATH=/app

# Change to the app directory
cd /app

# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

# Run Alembic migrations using Poetry
poetry run alembic upgrade head

# Start the FastAPI application
exec poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload