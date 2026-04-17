/**
 * authService.js — Mock authentication service
 */

const MOCK_USERS = [
  { id: 1, email: 'admin@techniaa.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { id: 2, email: 'user@techniaa.com', password: 'user123', name: 'Ahmet Yılmaz', role: 'user' },
  { id: 3, email: 'manager@techniaa.com', password: 'manager123', name: 'Otel Yönetici', role: 'manager' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(email, password) {
  await delay(700);
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    throw new Error('Geçersiz e-posta veya şifre');
  }
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: `mock-jwt-token-${user.id}-${Date.now()}` };
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('techniaa_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem('techniaa_token');
}

export function storeAuth(user, token) {
  localStorage.setItem('techniaa_user', JSON.stringify(user));
  localStorage.setItem('techniaa_token', token);
}

export function clearAuth() {
  localStorage.removeItem('techniaa_user');
  localStorage.removeItem('techniaa_token');
}
