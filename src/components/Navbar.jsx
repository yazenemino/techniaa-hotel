import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Navbar — Sticky navigation with glassmorphism backdrop
 */
export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-active' : '';

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">T</div>
        <h1>Techni<span>aa</span></h1>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>
          Oteller
        </Link>
        {isAdmin && (
          <Link to="/admin" className={isActive('/admin')}>
            Yönetim Paneli
          </Link>
        )}
        {isAuthenticated ? (
          <>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)', padding: '0 var(--space-2)' }}>
              {user?.name}
            </span>
            <button onClick={logout} className="btn-nav-accent" id="logout-btn">
              Çıkış
            </button>
          </>
        ) : (
          <Link to="/login" className={`btn-nav-accent ${isActive('/login')}`} id="login-link">
            Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  );
}
