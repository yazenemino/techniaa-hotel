import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../hooks/useAuth.js';
import { fetchHotelById, submitReservation } from '../services/hotelService.js';
import { useDispatch } from 'react-redux';
import { addReservation } from '../store/reservationSlice.js';

/**
 * ReservationForm — Booking form with strict validations
 * - Check-out >= Check-in via minDate; reset check-out when check-in changes
 * - onKeyDown regex to prevent non-numeric input in person count
 * - isLoading state + disabled button + "Onaylanıyor..." text
 */
export default function ReservationForm() {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [personCount, setPersonCount] = useState('');
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchHotelById(hotelId)
      .then((data) => {
        setHotel(data);
        const found = data.rooms?.find((r) => r.id === Number(roomId));
        setRoom(found || null);
        if (found) setPersonCount(String(found.personCount));
      })
      .catch(console.error)
      .finally(() => setPageLoading(false));
  }, [hotelId, roomId]);

  // Reset check-out when check-in changes
  const handleCheckInChange = (date) => {
    setCheckIn(date);
    // If current check-out is before new check-in, reset it
    if (checkOut && date && checkOut < date) {
      setCheckOut(null);
    }
  };

  // Prevent non-numeric characters in person count
  const handlePersonCountKeyDown = (e) => {
    // Allow control keys
    if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      return;
    }
    // Block non-numeric
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const getPrice = () => {
    const price = room?.pricePerNight ?? room?.price ?? 0;
    return price;
  };

  const getTotalPrice = () => {
    return getNights() * getPrice();
  };

  const canSubmit =
    checkIn &&
    checkOut &&
    personCount &&
    Number(personCount) > 0 &&
    guestName.trim() &&
    !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    try {
      const reservation = await submitReservation({
        hotelId: Number(hotelId),
        hotelName: hotel?.name,
        roomId: Number(roomId),
        roomName: room?.name,
        guestName: guestName.trim(),
        guestEmail,
        guestPhone,
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
        personCount: Number(personCount),
        totalPrice: getTotalPrice(),
      });

      // Add to Redux store for admin panel
      dispatch(addReservation(reservation));

      setToast({ type: 'success', message: 'Rezervasyonunuz başarıyla oluşturuldu!' });
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      setToast({ type: 'error', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="reservation-page" style={{ animation: 'pulse 1.5s infinite', minHeight: '60vh' }}>
        <div style={{ height: 60, background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }} />
        <div style={{ height: 400, background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)' }} />
      </div>
    );
  }

  return (
    <div className="reservation-page" id="reservation-page">
      <h1 className="animate-fade-in">Rezervasyon</h1>
      <p className="subtitle animate-fade-in-delay-1">
        {hotel?.name} — {room?.name}
      </p>

      <form className="reservation-form animate-fade-in-delay-2" onSubmit={handleSubmit} id="reservation-form">
        {/* Guest Info */}
        <div className="form-group">
          <label htmlFor="guest-name">Ad Soyad *</label>
          <input
            type="text"
            id="guest-name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Adınız ve soyadınız"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guest-email">E-posta</label>
            <input
              type="email"
              id="guest-email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="ornek@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="guest-phone">Telefon</label>
            <input
              type="tel"
              id="guest-phone"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+90 5XX XXX XX XX"
            />
          </div>
        </div>

        <hr className="form-divider" />

        {/* Date Selection */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="check-in-date">Giriş Tarihi *</label>
            <DatePicker
              id="check-in-date"
              selected={checkIn}
              onChange={handleCheckInChange}
              minDate={new Date()}
              placeholderText="Giriş tarihi seçin"
              dateFormat="dd/MM/yyyy"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="check-out-date">Çıkış Tarihi *</label>
            <DatePicker
              id="check-out-date"
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={checkIn || new Date()}
              placeholderText="Çıkış tarihi seçin"
              dateFormat="dd/MM/yyyy"
              autoComplete="off"
              disabled={!checkIn}
            />
          </div>
        </div>

        {/* Person Count */}
        <div className="form-group">
          <label htmlFor="person-count">Kişi Sayısı *</label>
          <input
            type="text"
            id="person-count"
            value={personCount}
            onChange={(e) => setPersonCount(e.target.value)}
            onKeyDown={handlePersonCountKeyDown}
            placeholder="Kişi sayısı girin"
            inputMode="numeric"
            maxLength={2}
          />
        </div>

        <hr className="form-divider" />

        {/* Summary */}
        {checkIn && checkOut && (
          <div className="form-summary" id="reservation-summary">
            <div className="summary-row">
              <span className="label">Otel</span>
              <span>{hotel?.name}</span>
            </div>
            <div className="summary-row">
              <span className="label">Oda</span>
              <span>{room?.name}</span>
            </div>
            <div className="summary-row">
              <span className="label">Giriş</span>
              <span>{checkIn.toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="summary-row">
              <span className="label">Çıkış</span>
              <span>{checkOut.toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="summary-row">
              <span className="label">Süre</span>
              <span>{getNights()} gece</span>
            </div>
            <div className="summary-row">
              <span className="label">Gecelik</span>
              <span>₺{getPrice().toLocaleString('tr-TR')}</span>
            </div>
            <div className="summary-row summary-total">
              <span className="label">Toplam</span>
              <span className="value">₺{getTotalPrice().toLocaleString('tr-TR')}</span>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={!canSubmit}
          id="confirm-reservation-btn"
          style={{ width: '100%' }}
        >
          {isLoading ? 'Onaylanıyor...' : 'Rezervasyonu Onayla'}
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`} id="reservation-toast">
          {toast.message}
        </div>
      )}
    </div>
  );
}
