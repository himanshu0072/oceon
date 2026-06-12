# OCEON Inventory Management System
**OCEON Wholesale Pvt. Ltd.** — Role-Based Inventory OS

Built with **MongoDB + Express + React + Node.js (MERN Stack)**

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ — [nodejs.org](https://nodejs.org)
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Setup MongoDB
**Local:** Install & start MongoDB, default port 27017
**Atlas:** Replace `MONGO_URI` in `backend/.env` with your Atlas connection string

### 2. Backend
```bash
cd backend
npm install
npm run seed       # seeds 4 demo users + 10 products
npm run dev        # runs on http://localhost:5000
```

### 3. Frontend (new terminal)
```bash
cd frontend
npm install
npm start          # opens http://localhost:3000
```

---

## 👥 Demo Accounts (4 Roles)

| Role               | Email                  | Password    | Access |
|--------------------|------------------------|-------------|--------|
| **Admin**          | aazad@oceon.in         | oceon123    | Everything |
| **Warehouse Mgr**  | rajan@oceon.in         | warehouse1  | Warehouse + approve transfers |
| **FC Manager**     | kabir@oceon.in         | fc1234      | FC inventory + request transfers + sales |
| **Salesperson**    | priya@oceon.in         | sales123    | Record sales only |

> The Login page has **clickable role cards** — tap a card to autofill credentials instantly.

---

## 🔐 Role Access Matrix

| Page / Action          | Admin | Warehouse Mgr | FC Manager | Salesperson |
|------------------------|:-----:|:-------------:|:----------:|:-----------:|
| Founder Dashboard      | ✅    | ❌             | ❌          | ❌           |
| Warehouse Inventory    | ✅    | ✅             | ❌          | ❌           |
| Receive Stock          | ✅    | ✅             | ❌          | ❌           |
| FC Inventory View      | ✅    | ✅ (read)      | ✅          | ✅           |
| Record Sale            | ✅    | ❌             | ✅          | ✅           |
| Request Transfer       | ✅    | ❌             | ✅          | ❌           |
| Approve Transfer       | ✅    | ✅             | ❌          | ❌           |
| Sales History          | ✅    | ❌             | ✅          | ✅           |
| Products (CRUD)        | ✅    | ❌             | ❌          | ❌           |
| User Management        | ✅    | ❌             | ❌          | ❌           |

---

## 📋 Modules

### Module 1 — Warehouse (Admin + Warehouse Manager)
- Product Name, SKU, Current Stock, Received, Sent to FC, Remaining
- Low Stock Alerts
- Receive new stock

### Module 2 — Fulfillment Center (Admin + FC Manager + Salesperson)
- Current inventory, daily sales, consumed, remaining
- Record new sales
- Low stock alerts

### Module 3 — Transfers (Warehouse ↔ FC)
- FC Manager requests stock → Warehouse Manager approves
- Auto stock update on approval:
  ```
  Warehouse: Milk 100 → 50
  FC:        Milk  10 → 60
  ```

### Module 4 — Founder Dashboard (Admin only)
- Today's revenue, orders, units
- Top selling products chart
- Low stock alerts (warehouse + FC)
- Pending transfers
- Recent sales

### Module 5 — User Management (Admin only)
- Create / edit / delete team members
- Assign roles with access preview
- Role summary cards

---

## 🗂 Project Structure
```
oceon/
├── backend/
│   └── src/
│       ├── config/       db.js, seed.js
│       ├── controllers/  auth, dashboard, fc, product, sales, transfer, user, warehouse
│       ├── middleware/   authMiddleware.js (protect + authorize)
│       ├── models/       User, Product, Warehouse, FC, Transfer, Sale
│       ├── routes/       all routes with role guards
│       └── server.js
└── frontend/
    └── src/
        ├── components/layout/  role-aware sidebar nav
        ├── context/            AuthContext
        ├── pages/
        │   ├── Login.js           role card selector
        │   ├── Dashboard.js       admin only
        │   ├── WarehouseHome.js   warehouse_manager home
        │   ├── FCHome.js          fc_manager home
        │   ├── SalespersonHome.js salesperson home
        │   ├── Warehouse.js
        │   ├── FCPage.js
        │   ├── Transfers.js
        │   ├── Sales.js
        │   ├── Products.js
        │   ├── Users.js           admin only
        │   └── Unauthorized.js
        └── utils/api.js
```

---

Built for OCEON Tech Challenge — Role-Based Inventory & Replenishment System
