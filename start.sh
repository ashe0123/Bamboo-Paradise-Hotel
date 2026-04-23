#!/bin/bash

echo "🌿 Starting Bamboo Paradise Hotel System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL first."
    echo "   Or use Docker: docker-compose up -d postgres"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your database credentials!"
    exit 1
fi

# Run migrations
echo "🗄️  Running database migrations..."
node src/database/migrate.js

# Seed database (only if users table is empty)
echo "🌱 Seeding database..."
node src/database/seed.js

# Start backend
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start frontend
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Bamboo Paradise Hotel is running!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:5000"
echo ""
echo "👤 Login credentials:"
echo "   Admin: admin@bambooparadise.com / admin123"
echo "   Staff: staff@bambooparadise.com / staff123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
