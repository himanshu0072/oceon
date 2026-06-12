import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 48 }}>🔒</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>Access Denied</div>
      <div style={{ fontSize: 14, color: 'var(--text2)' }}>
        Your role <strong style={{ color: 'var(--accent)' }}>{user?.role}</strong> doesn't have permission for this page.
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
    </div>
  );
}
