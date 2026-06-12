import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Warehouse from './pages/Warehouse';
import FCPage from './pages/FCPage';
import Transfers from './pages/Transfers';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Users from './pages/Users';
import SalespersonHome from './pages/SalespersonHome';
import WarehouseHome from './pages/WarehouseHome';
import FCHome from './pages/FCHome';
import Unauthorized from './pages/Unauthorized';

// Role → default landing page
const ROLE_HOME = {
  admin:             '/',
  warehouse_manager: '/',
  fc_manager:        '/',
  salesperson:       '/',
};

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

// The index "/" renders different component per role
const RoleHome = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin')             return <Dashboard />;
  if (user.role === 'warehouse_manager') return <WarehouseHome />;
  if (user.role === 'fc_manager')        return <FCHome />;
  if (user.role === 'salesperson')       return <SalespersonHome />;
  return <Navigate to="/unauthorized" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#181e2e', color: '#e8eaf2', border: '1px solid #252d45', fontFamily: 'Space Grotesk' },
            success: { iconTheme: { primary: '#00e676', secondary: '#000' } },
            error:   { iconTheme: { primary: '#ff5252', secondary: '#000' } },
          }}
        />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            {/* Role-dispatched home */}
            <Route index element={<RoleHome />} />

            {/* Admin only */}
            <Route path="dashboard" element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>} />
            <Route path="users"     element={<PrivateRoute roles={['admin']}><Users /></PrivateRoute>} />
            <Route path="products"  element={<PrivateRoute roles={['admin']}><Products /></PrivateRoute>} />

            {/* Admin + Warehouse Manager */}
            <Route path="warehouse" element={<PrivateRoute roles={['admin','warehouse_manager']}><Warehouse /></PrivateRoute>} />

            {/* Admin + FC Manager + Salesperson */}
            <Route path="fc"    element={<PrivateRoute roles={['admin','fc_manager','salesperson','warehouse_manager']}><FCPage /></PrivateRoute>} />
            <Route path="sales" element={<PrivateRoute roles={['admin','fc_manager','salesperson']}><Sales /></PrivateRoute>} />

            {/* Admin + FC Manager + Warehouse Manager */}
            <Route path="transfers" element={<PrivateRoute roles={['admin','warehouse_manager','fc_manager']}><Transfers /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
