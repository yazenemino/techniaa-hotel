import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchReservations,
  setFilterStatus,
  updateReservationStatus,
} from '../store/reservationSlice.js';

/**
 * AdminPanel — Hotel Manager reservation management
 * - Redux for state management
 * - Filter by Pending, Confirmed, Cancelled, or All
 * - CRUCIAL: useEffect dependency array includes filterStatus
 * - Consistent status label colors via inline styles
 */
export default function AdminPanel() {
  const dispatch = useDispatch();
  const { list, filterStatus, loading } = useSelector((state) => state.reservations);

  // CRUCIAL FIX: filterStatus is in the dependency array
  // This ensures a re-fetch when user selects 'All' or any other filter
  useEffect(() => {
    dispatch(fetchReservations(filterStatus));
  }, [dispatch, filterStatus]);

  const handleFilterChange = (status) => {
    dispatch(setFilterStatus(status));
  };

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateReservationStatus({ id, status: newStatus }));
  };

  // Status label colors — inline styles to avoid global CSS conflicts
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return { backgroundColor: 'rgba(45, 212, 168, 0.15)', color: '#2dd4a8', borderColor: 'rgba(45, 212, 168, 0.25)' };
      case 'Pending':
        return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.25)' };
      case 'Cancelled':
        return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.25)' };
      default:
        return { backgroundColor: 'rgba(255,255,255,0.05)', color: '#8e8e9e' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Confirmed': return 'Onaylandı';
      case 'Pending': return 'Beklemede';
      case 'Cancelled': return 'İptal';
      default: return status;
    }
  };

  const filters = ['All', 'Pending', 'Confirmed', 'Cancelled'];
  const filterLabels = { All: 'Tümü', Pending: 'Beklemede', Confirmed: 'Onaylandı', Cancelled: 'İptal' };

  // Stats
  const totalRevenue = list
    .filter((r) => r.status === 'Confirmed')
    .reduce((sum, r) => sum + (r.totalPrice || 0), 0);

  const pendingCount = list.filter((r) => r.status === 'Pending').length;
  const confirmedCount = list.filter((r) => r.status === 'Confirmed').length;

  return (
    <div className="admin-page" id="admin-page">
      <h1 className="animate-fade-in">Yönetim Paneli</h1>
      <p className="subtitle animate-fade-in-delay-1">Rezervasyonları yönetin ve takip edin</p>

      {/* Stats Cards */}
      <div className="admin-stats animate-fade-in-delay-1">
        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(201, 162, 39, 0.15)', color: '#c9a227' }}>#</div>
          <div className="stat-value">{list.length}</div>
          <div className="stat-label">Toplam Rezervasyon</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>...</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Bekleyen</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(45, 212, 168, 0.15)', color: '#2dd4a8' }}>OK</div>
          <div className="stat-value">{confirmedCount}</div>
          <div className="stat-label">Onaylanan</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>TL</div>
          <div className="stat-value">₺{totalRevenue.toLocaleString('tr-TR')}</div>
          <div className="stat-label">Toplam Gelir</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-filter-bar animate-fade-in-delay-2" id="admin-filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filterStatus === f ? 'active' : ''}`}
            onClick={() => handleFilterChange(f)}
            id={`filter-${f.toLowerCase()}`}
          >
            {filterLabels[f]} {filterStatus === f && `(${list.length})`}
          </button>
        ))}
      </div>

      {/* Reservations Table */}
      <div className="admin-table-wrapper animate-fade-in-delay-3">
        {loading ? (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Yükleniyor...
          </div>
        ) : list.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">--</div>
            <h3>Rezervasyon bulunamadı</h3>
            <p>Seçili filtreye uygun rezervasyon yok.</p>
          </div>
        ) : (
          <table className="admin-table" id="admin-reservations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Misafir</th>
                <th>Otel</th>
                <th>Oda</th>
                <th>Giriş</th>
                <th>Çıkış</th>
                <th>Kişi</th>
                <th>Tutar</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {list.map((reservation) => (
                <tr key={reservation.id} id={`reservation-row-${reservation.id}`}>
                  <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    #{reservation.id}
                  </td>
                  <td>
                    <div className="guest-cell">
                      <div className="guest-avatar">
                        {reservation.guestName?.charAt(0).toUpperCase()}
                      </div>
                      <span>{reservation.guestName}</span>
                    </div>
                  </td>
                  <td>{reservation.hotelName}</td>
                  <td>{reservation.roomName}</td>
                  <td>{reservation.checkIn}</td>
                  <td>{reservation.checkOut}</td>
                  <td style={{ textAlign: 'center' }}>{reservation.personCount}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                    ₺{reservation.totalPrice?.toLocaleString('tr-TR')}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        ...getStatusStyle(reservation.status),
                        border: `1px solid ${getStatusStyle(reservation.status).borderColor || 'transparent'}`,
                      }}
                    >
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {reservation.status === 'Pending' && (
                        <>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleStatusUpdate(reservation.id, 'Confirmed')}
                            id={`confirm-${reservation.id}`}
                          >
                            Onayla
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStatusUpdate(reservation.id, 'Cancelled')}
                            id={`cancel-${reservation.id}`}
                          >
                            İptal
                          </button>
                        </>
                      )}
                      {reservation.status === 'Confirmed' && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleStatusUpdate(reservation.id, 'Cancelled')}
                          id={`cancel-${reservation.id}`}
                        >
                          İptal Et
                        </button>
                      )}
                      {reservation.status === 'Cancelled' && (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)' }}>—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
