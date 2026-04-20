import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * HotelCard — Responsive card in the hotel grid
 * - min-height on title area to prevent layout shifts
 * - Fallback text when price is null/undefined
 */
export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const price = hotel.pricePerNight ?? hotel.price ?? null;

  return (
    <div
      className="hotel-card animate-fade-in"
      id={`hotel-card-${hotel.id}`}
      onClick={() => navigate(`/hotel/${hotel.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/hotel/${hotel.id}`)}
    >
      <div className="hotel-card-image">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        <div className="card-badge">
          ★ {hotel.rating}
        </div>
      </div>

      <div className="hotel-card-body">
        <div className="card-title">{hotel.name}</div>
        <div className="card-location">
          {hotel.location}
        </div>
        <div className="card-amenities">
          {hotel.amenities?.slice(0, 4).map((amenity) => (
            <span className="amenity-tag" key={amenity}>
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="hotel-card-footer">
        {price !== null && price !== undefined ? (
          <div className="card-price">
            ₺{price.toLocaleString('tr-TR')} <span>/ gece</span>
          </div>
        ) : (
          <div className="card-price-fallback">Fiyat bilgisi mevcut değil</div>
        )}
        <div className="card-rating">
          {hotel.reviewCount} değerlendirme
        </div>
      </div>
    </div>
  );
}
