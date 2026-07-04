import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, verifyToken } from './api';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    verifyToken().then(ok => { if (ok) navigate('/admin/dashboard', { replace: true }); });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="alog-page">
      <div className="alog-card">
        <div className="alog-logo">
          <div className="alog-logo-badge">🛡️</div>
          <h1>DRDO Admin</h1>
          <p>Content Management System</p>
        </div>

        <form className="alog-form" onSubmit={handleSubmit}>
          {error && <div className="alog-error">⚠ {error}</div>}

          <div className="alog-field">
            <label htmlFor="al-user">Username</label>
            <input id="al-user" type="text" placeholder="admin" value={username}
              onChange={e => setUsername(e.target.value)} required />
          </div>

          <div className="alog-field">
            <label htmlFor="al-pass">Password</label>
            <div className="alog-pass-wrap">
              <input
                id="al-pass"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="alog-eye-btn"
                onMouseEnter={() => setShowPass(true)}
                onMouseLeave={() => setShowPass(false)}
                tabIndex={-1}
                aria-label="Hold to reveal password"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="alog-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <div className="alog-footer">Authorised access only · DRDO CMS</div>
      </div>
    </div>
  );
}
