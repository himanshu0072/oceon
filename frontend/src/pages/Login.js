import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Login.css";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    email: "aazad@oceon.in",
    password: "oceon123",
    color: "#00d4ff",
    icon: "👑",
    desc: "Full access — dashboard, all modules, user management",
  },
  {
    role: "Warehouse Manager",
    email: "rajan@oceon.in",
    password: "warehouse1",
    color: "#a78bfa",
    icon: "🏭",
    desc: "Manage warehouse stock, approve/reject transfers",
  },
  {
    role: "FC Manager",
    email: "kabir@oceon.in",
    password: "fc1234",
    color: "#00e676",
    icon: "📦",
    desc: "FC inventory, request transfers, record sales",
  },
  {
    role: "Salesperson",
    email: "priya@oceon.in",
    password: "sales123",
    color: "#ffab40",
    icon: "🛒",
    desc: "Record sales at Fulfillment Center only",
  },
];

export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (!result.success) toast.error(result.message);
  };

  const fillDemo = (acc) => {
    setForm({ email: acc.email, password: acc.password });
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-grid" />
      </div>

      <div className="login-wrapper">
        {/* Left: Demo role cards */}
        {/* <div className="login-roles">
          <div className="login-roles-title">Role-Based Access</div>
          <div className="login-roles-sub">
            Click any role to autofill credentials
          </div>
          <div className="roles-list">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                className="role-card"
                onClick={() => fillDemo(acc)}
                style={{ "--role-color": acc.color }}
              >
                <div className="role-card-top">
                  <span className="role-icon">{acc.icon}</span>
                  <span className="role-name">{acc.role}</span>
                </div>
                <div className="role-desc">{acc.desc}</div>
                <div className="role-creds">
                  <span>{acc.email}</span>
                </div>
              </button>
            ))}
          </div>
        </div> */}

        {/* Right: Login form */}
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-mark">O</div>
            <div>
              <div className="login-brand">OCEON</div>
              <div className="login-tagline">Wholesale · Inventory OS</div>
            </div>
          </div>
          <div className="login-divider" />
          <h2 className="login-title">Sign In</h2>
          <p className="login-sub">
            Enter your credentials or click a role card →
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner"
                    style={{ width: 14, height: 14, borderWidth: 2 }}
                  />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
