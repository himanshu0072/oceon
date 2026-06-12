@echo off
echo ===============================
echo  OCEON Inventory Setup (Windows)
echo ===============================
echo.

echo [1/3] Installing backend dependencies...
cd backend
call npm install
echo.

echo [2/3] Installing frontend dependencies...
cd ..\frontend
call npm install
cd ..
echo.

echo [3/3] Seeding database with OCEON sample data...
cd backend
call npm run seed
cd ..
echo.

echo ===============================
echo  Setup Complete!
echo ===============================
echo.
echo  To run the app:
echo  1. Terminal 1: cd backend ^&^& npm run dev
echo  2. Terminal 2: cd frontend ^&^& npm start
echo.
echo  Login: aazad@oceon.in / oceon123
echo  App:   http://localhost:3000
echo.
pause
