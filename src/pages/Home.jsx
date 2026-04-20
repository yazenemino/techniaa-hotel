import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard.jsx';
import { fetchHotels } from '../services/hotelService.js';

/**
 * Home — Landing page with hero section and responsive hotel grid
 */
export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels()
      .then(setHotels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">PREMIUM KONAKLAMA</div>
        <h1>
          Hayalinizdeki Tatil<br />
          <span className="text-gradient">Techniaa ile Başlıyor</span>
        </h1>
        <p>
          Türkiye'nin en özel otellerini keşfedin. Lüks, konfor ve unutulmaz
          deneyimler sizi bekliyor.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">500+</div>
            <div className="stat-label">Premium Otel</div>
          </div>
          <div className="stat">
            <div className="stat-value">50K+</div>
            <div className="stat-label">Mutlu Misafir</div>
          </div>
          <div className="stat">
            <div className="stat-value">81</div>
            <div className="stat-label">Şehir</div>
          </div>
        </div>
      </section>

      {/* Hotel Listings */}
      <div className="section-header">
        <h2>Öne Çıkan Oteller</h2>
        <p>Sizin için seçtiğimiz en popüler konaklama seçenekleri</p>
      </div>

      {loading ? (
        <div className="hotel-grid">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="hotel-card"
              style={{
                minHeight: 380,
                background: 'var(--color-bg-card)',
                animation: 'pulse 1.5s infinite',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="hotel-grid" id="hotel-grid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
