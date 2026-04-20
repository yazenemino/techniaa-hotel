import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Login — Authentication page
 * Redirects back to intended destination after login
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // error is set by useAuth
    }
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-card animate-fade-in">
        <div className="login-icon">T</div>
        <h1>Hoş Geldiniz</h1>
        <p className="subtitle">Techniaa hesabınıza giriş yapın</p>

        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label htmlFor="login-email">E-posta</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@techniaa.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Şifre</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="form-group">
              <div className="form-error" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                {error}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            id="login-submit-btn"
            style={{ width: '100%', marginBottom: 'var(--space-6)' }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          textAlign: 'left',
          fontSize: 'var(--fs-xs)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
            Demo Hesaplar:
          </div>
          <div><strong style={{ color: 'var(--color-text-secondary)' }}>Kullanıcı:</strong> user@techniaa.com / user123</div>
          <div><strong style={{ color: 'var(--color-text-secondary)' }}>Admin:</strong> admin@techniaa.com / admin123</div>
          <div><strong style={{ color: 'var(--color-text-secondary)' }}>Yönetici:</strong> manager@techniaa.com / manager123</div>
        </div>
      </div>
    </div>
  );
}
