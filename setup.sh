#!/bin/bash
echo "==============================="
echo " OCEON Inventory Setup (Mac/Linux)"
echo "==============================="
echo ""

echo "[1/3] Installing backend dependencies..."
cd backend && npm install && cd ..
echo ""

echo "[2/3] Installing frontend dependencies..."
cd frontend && npm install && cd ..
echo ""

echo "[3/3] Seeding database with OCEON sample data..."
cd backend && npm run seed && cd ..
echo ""

echo "==============================="
echo " Setup Complete!"
echo "==============================="
echo ""
echo " To run the app:"
echo " Terminal 1: cd backend && npm run dev"
echo " Terminal 2: cd frontend && npm start"
echo ""
echo " Login: aazad@oceon.in / oceon123"
echo " App:   http://localhost:3000"
