@echo off
REM Quick Start Script for Makka Project (Windows)

echo.
echo 🌾 Makka - Premium Maize Business Website
echo ===========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd server

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

if not exist ".env" (
    echo.
    echo ⚠️  .env file not found. Please create it with the following content:
    echo.
    echo PORT=5000
    echo MONGODB_URI=mongodb://localhost:27017/makka
    echo JWT_SECRET=your_secret_key
    echo ADMIN_EMAIL=admin@makka.com
    echo ADMIN_PASSWORD=admin@123
    echo NODE_ENV=development
    echo CORS_ORIGIN=http://localhost:3000
    echo.
) else (
    echo ✅ Backend .env file found
)

cd ..

REM Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

if not exist ".env.local" (
    echo.
    echo ⚠️  .env.local file not found. Please create it with:
    echo.
    echo NEXT_PUBLIC_API_URL=http://localhost:5000
    echo NEXT_PUBLIC_APP_NAME=Makka Premium Maize
    echo NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
    echo.
) else (
    echo ✅ Frontend .env.local file found
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Ensure MongoDB is running: mongod
echo 2. In Command Prompt 1, run: cd server ^&^& npm run dev
echo 3. In Command Prompt 2, run: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000 in your browser
echo 5. Admin login at http://localhost:3000/admin-login
echo 6. Default credentials: admin@makka.com / admin@123
echo.
echo Happy coding! 🚀
echo.
pause
