import { useState, useEffect, useCallback } from 'react';
import { getStoredUser, getStoredToken, storeAuth, clearAuth, login as loginService } from '../services/authService.js';

/**
 * useAuth hook — manages authentication state
 */
export function useAuth() {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginService(email, password);
      storeAuth(result.user, result.token);
      setUser(result.user);
      setToken(result.token);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setToken(null);
  }, []);

  return { user, token, isAuthenticated, isAdmin, loading, error, login, logout };
}
