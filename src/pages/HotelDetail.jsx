import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import RoomList from '../components/RoomList.jsx';
import CommentSection from '../components/CommentSection.jsx';
import { fetchHotelById, fetchRooms, fetchComments } from '../services/hotelService.js';

/**
 * HotelDetail — Hotel details page with room filtering by person count
 * - Uses CSS opacity transition instead of a loading spinner
 * - Filters rooms via query string: /api/rooms?hotelId=X&count=Y
 */
export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [comments, setComments] = useState([]);
  const [personCount, setPersonCount] = useState('');
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Load hotel data on mount
  useEffect(() => {
    async function load() {
      try {
        const [hotelData, roomData, commentData] = await Promise.all([
          fetchHotelById(id),
          fetchRooms(id),
          fetchComments(id),
        ]);
        setHotel(hotelData);
        setRooms(roomData);
        setComments(commentData);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    }
    load();
  }, [id]);

  // Filter rooms by person count — CSS opacity transition on old list
  const handleFilterChange = useCallback(
    async (count) => {
      setPersonCount(count);
      setRoomsLoading(true); // triggers opacity fade
      try {
        const filtered = await fetchRooms(id, count);
        setRooms(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setRoomsLoading(false);
      }
    },
    [id]
  );

  if (pageLoading) {
    return (
      <div className="hotel-detail" style={{ animation: 'pulse 1.5s infinite', minHeight: '60vh' }}>
        <div
          style={{
            height: 400,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--color-bg-card)',
          }}
        />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-detail">
        <div className="empty-state">
          <div className="empty-icon">🏨</div>
          <h3>Otel bulunamadı</h3>
          <p>Bu ID ile eşleşen bir otel mevcut değil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hotel-detail" id="hotel-detail-page">
      {/* Header Image */}
      <div className="hotel-detail-header animate-fade-in">
        <img src={hotel.image} alt={hotel.name} />
        <div className="detail-overlay">
          <h1>{hotel.name}</h1>
          <p>📍 {hotel.location} &nbsp;|&nbsp; ★ {hotel.rating} ({hotel.reviewCount} değerlendirme)</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="hotel-detail-info">
        <div className="hotel-detail-description animate-fade-in-delay-1">
          <h2>Otel Hakkında</h2>
          <p>{hotel.description}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-6)' }}>
            {hotel.amenities?.map((a) => (
              <span className="amenity-tag" key={a} style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-sm)' }}>
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="hotel-detail-sidebar animate-fade-in-delay-2">
          <h3>Hızlı Bilgi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Konum</span>
              <span>{hotel.location}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Puan</span>
              <span style={{ color: 'var(--color-accent)' }}>★ {hotel.rating}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Oda Sayısı</span>
              <span>{hotel.rooms?.length || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Yorum</span>
              <span>{hotel.reviewCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Filtering */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-4)' }}>
        Odalar
      </h2>

      <div className="filter-bar animate-fade-in-delay-2" id="room-filter-bar">
        <label htmlFor="person-count-filter">Kişi Sayısı:</label>
        <select
          id="person-count-filter"
          value={personCount}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">Tümü</option>
          <option value="1">1 Kişi</option>
          <option value="2">2 Kişi</option>
          <option value="3">3 Kişi</option>
          <option value="4">4+ Kişi</option>
        </select>
      </div>

      <RoomList rooms={rooms} hotelId={hotel.id} isLoading={roomsLoading} />

      {/* Comments */}
      <CommentSection hotelId={hotel.id} comments={comments} />
    </div>
  );
}
