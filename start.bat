@echo off
echo 🌿 Starting Bamboo Paradise Hotel System...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  No .env file found. Copying from .env.example...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your database credentials!
    pause
    exit /b 1
)

REM Run migrations
echo 🗄️  Running database migrations...
call node src/database/migrate.js

REM Seed database
echo 🌱 Seeding database...
call node src/database/seed.js

REM Start backend
echo 🚀 Starting backend server...
start "Bamboo Paradise Backend" cmd /k npm run dev

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    call npm install
)

REM Start frontend
echo 🚀 Starting frontend server...
start "Bamboo Paradise Frontend" cmd /k npm run dev

echo.
echo ✅ Bamboo Paradise Hotel is running!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:5000
echo.
echo 👤 Login credentials:
echo    Admin: admin@bambooparadise.com / admin123
echo    Staff: staff@bambooparadise.com / staff123
echo.
echo Close the terminal windows to stop the servers
pause
