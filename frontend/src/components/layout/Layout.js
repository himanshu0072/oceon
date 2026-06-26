import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.css";

// Define which nav items each role can see
const NAV_CONFIG = {
  admin: [
    {
      section: "Overview",
      items: [{ to: "/app", icon: "⬡", label: "Dashboard", exact: true }],
    },
    {
      section: "Inventory",
      items: [{ to: "/app/warehouse", icon: "🏭", label: "Warehouse" }],
    },
    {
      section: "Manage B2B Clients",
      items: [
        {
          to: "/app/manageclients",
          icon: "📝",
          label: "Register Client",
        },

        {
          to: "/app/searchclients",
          icon: "🔍",
          label: "Search Clients",
        },

        {
          to: "/app/addpurchase",
          icon: "🛒",
          label: "Add Purchase",
        },

        {
          to: "/app/purchasehistory",
          icon: "📦",
          label: "Purchase History",
        },

        {
          to: "/app/totalclientsdashboard",
          icon: "📊",
          label: "Clients Dashboard",
        },
      ],
    },
    {
      section: "Operations",
      items: [
        { to: "/app/sales", icon: "₹", label: "Sales" },
        { to: "/app/products", icon: "◈", label: "Products" },
      ],
    },
    {
      section: "Admin",
      items: [{ to: "/app/users", icon: "👥", label: "User Management" }],
    },
  ],
  warehouse_manager: [
    {
      section: "Inventory",
      items: [
        { to: "/", icon: "🏭", label: "Warehouse", exact: true },
        { to: "/app/transfers", icon: "⇄", label: "Transfers" },
      ],
    },
    {
      section: "View Only",
      items: [{ to: "/app/fc", icon: "📦", label: "FC Stock" }],
    },
  ],
  fc_manager: [
    {
      section: "FC Operations",
      items: [
        { to: "/app", icon: "📦", label: "FC Inventory", exact: true },
        { to: "/app/transfers", icon: "⇄", label: "Request Transfer" },
        { to: "/app/sales", icon: "₹", label: "Sales" },
      ],
    },
  ],
  salesperson: [
    {
      section: "Sales",
      items: [
        { to: "/app", icon: "🛒", label: "Record Sale", exact: true },
        { to: "/app/sales", icon: "₹", label: "Sales History" },
      ],
    },
  ],
};

const ROLE_COLORS = {
  admin: "#00d4ff",
  warehouse_manager: "#a78bfa",
  fc_manager: "#00e676",
  salesperson: "#ffab40",
};
const ROLE_LABELS = {
  admin: "Admin",
  warehouse_manager: "Warehouse Manager",
  fc_manager: "FC Manager",
  salesperson: "Salesperson",
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const navGroups = NAV_CONFIG[user?.role] || [];
  const roleColor = ROLE_COLORS[user?.role] || "var(--accent)";
  const roleLabel = ROLE_LABELS[user?.role] || user?.role;

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">O</div>
          <div>
            <div className="logo-name">OCEON</div>
            <div className="logo-sub">Inventory OS</div>
          </div>
        </div>

        {/* Role badge in sidebar */}
        <div className="sidebar-role" style={{ "--rc": roleColor }}>
          <span className="sidebar-role-dot" />
          {roleLabel}
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.section}>
              <div className="nav-section-label">{group.section}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div
              className="user-avatar"
              style={{
                background: `linear-gradient(135deg, ${roleColor}, #0070ff)`,
              }}
            >
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role" style={{ color: roleColor }}>
                {roleLabel}
              </div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            ⏻
          </button>
        </div>
      </aside>

      <div className="layout-main">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            ☰
          </button>
          <div className="topbar-right">
            <div className="topbar-time">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
