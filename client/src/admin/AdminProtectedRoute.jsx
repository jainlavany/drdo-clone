import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from './api';

export default function AdminProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'ok' | 'denied'

  useEffect(() => {
    verifyToken().then(valid => setStatus(valid ? 'ok' : 'denied'));
  }, []);

  if (status === 'checking') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f172a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#94a3b8', fontFamily: 'Inter, sans-serif',
      }}>
        Verifying session…
      </div>
    );
  }

  if (status === 'denied') return <Navigate to="/admin" replace />;
  return children;
}
