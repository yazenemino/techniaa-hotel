import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

/**
 * RoomList — Displays room cards with CSS opacity transition while loading
 * - No spinner: uses opacity fade on old list during fetch
 * - Price fallback for null/undefined values
 */
export default function RoomList({ rooms, hotelId, isLoading }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBookRoom = (room) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/reserve/${hotelId}/${room.id}` } });
    } else {
      navigate(`/reserve/${hotelId}/${room.id}`);
    }
  };

  const getPrice = (room) => room.pricePerNight ?? room.price ?? null;

  if (!rooms || rooms.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">--</div>
        <h3>Oda bulunamadı</h3>
        <p>Seçtiğiniz kriterlere uygun oda bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className={`room-list ${isLoading ? 'loading' : ''}`} id="room-list">
      {rooms.map((room, index) => {
        const price = getPrice(room);
        return (
          <div
            className="room-card animate-fade-in"
            key={room.id}
            id={`room-card-${room.id}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="room-card-image">
              <img src={room.image} alt={room.name} loading="lazy" />
            </div>

            <div className="room-card-info">
              <h3>{room.name}</h3>
              <div className="room-features">
                <span>{room.personCount} Kisi</span>
                {room.features?.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <p>
                Bu oda {room.personCount} kişilik konaklama için uygundur.
              </p>
            </div>

            <div className="room-card-actions">
              {price !== null && price !== undefined ? (
                <div className="room-price">
                  <div className="amount">₺{price.toLocaleString('tr-TR')}</div>
                  <div className="per-night">/ gece</div>
                </div>
              ) : (
                <div className="room-price-fallback">
                  Fiyat bilgisi mevcut değil
                </div>
              )}
              <button
                className="btn btn-primary"
                id={`book-room-${room.id}`}
                onClick={() => handleBookRoom(room)}
              >
                Rezervasyon Yap
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
