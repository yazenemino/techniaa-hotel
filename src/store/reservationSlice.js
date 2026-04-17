import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock reservation data for the admin panel
const MOCK_RESERVATIONS = [
  { id: 1001, guestName: 'Ahmet Yılmaz', hotelName: 'The Grand Bosphorus Palace', roomName: 'Deluxe Suite', checkIn: '2026-04-20', checkOut: '2026-04-23', personCount: 2, totalPrice: 7200, status: 'Confirmed', createdAt: '2026-04-10' },
  { id: 1002, guestName: 'Fatma Demir', hotelName: 'Cappadocia Cave Resort', roomName: 'Royal Cave Suite', checkIn: '2026-04-25', checkOut: '2026-04-28', personCount: 3, totalPrice: 13500, status: 'Pending', createdAt: '2026-04-12' },
  { id: 1003, guestName: 'Mehmet Kaya', hotelName: 'Aegean Breeze Hotel', roomName: 'Beach Bungalow', checkIn: '2026-05-01', checkOut: '2026-05-05', personCount: 2, totalPrice: 14000, status: 'Confirmed', createdAt: '2026-04-08' },
  { id: 1004, guestName: 'Zeynep Arslan', hotelName: 'Antalya Lara Premium', roomName: 'King Suite', checkIn: '2026-04-18', checkOut: '2026-04-20', personCount: 2, totalPrice: 5600, status: 'Cancelled', createdAt: '2026-04-05' },
  { id: 1005, guestName: 'Ali Çelik', hotelName: 'The Grand Bosphorus Palace', roomName: 'Standart Oda', checkIn: '2026-04-22', checkOut: '2026-04-24', personCount: 2, totalPrice: 2400, status: 'Pending', createdAt: '2026-04-14' },
  { id: 1006, guestName: 'Elif Türk', hotelName: 'Trabzon Uzungöl Lodge', roomName: 'Göl Manzaralı Oda', checkIn: '2026-05-10', checkOut: '2026-05-13', personCount: 2, totalPrice: 1950, status: 'Confirmed', createdAt: '2026-04-15' },
  { id: 1007, guestName: 'Burak Şahin', hotelName: 'Pamukkale Thermal Spa', roomName: 'VIP Suite', checkIn: '2026-04-28', checkOut: '2026-04-30', personCount: 2, totalPrice: 2800, status: 'Pending', createdAt: '2026-04-16' },
  { id: 1008, guestName: 'Selin Öz', hotelName: 'Cappadocia Cave Resort', roomName: 'Cave Standard', checkIn: '2026-05-05', checkOut: '2026-05-08', personCount: 2, totalPrice: 5400, status: 'Cancelled', createdAt: '2026-04-11' },
  { id: 1009, guestName: 'Emre Koç', hotelName: 'Aegean Breeze Hotel', roomName: 'Deniz Manzaralı Oda', checkIn: '2026-05-15', checkOut: '2026-05-18', personCount: 2, totalPrice: 4500, status: 'Confirmed', createdAt: '2026-04-13' },
  { id: 1010, guestName: 'Ayşe Güneş', hotelName: 'Antalya Lara Premium', roomName: 'Aile Odası', checkIn: '2026-06-01', checkOut: '2026-06-07', personCount: 4, totalPrice: 9600, status: 'Pending', createdAt: '2026-04-17' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Async thunk: fetches reservations filtered by status
 * CRUCIAL: filterStatus is included to trigger re-fetch when user selects 'All'
 */
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (filterStatus) => {
    await delay(500);
    if (!filterStatus || filterStatus === 'All') {
      return MOCK_RESERVATIONS;
    }
    return MOCK_RESERVATIONS.filter((r) => r.status === filterStatus);
  }
);

export const updateReservationStatus = createAsyncThunk(
  'reservations/updateStatus',
  async ({ id, status }) => {
    await delay(400);
    const reservation = MOCK_RESERVATIONS.find((r) => r.id === id);
    if (reservation) {
      reservation.status = status;
    }
    return { id, status };
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    filterStatus: 'All',
    loading: false,
    error: null,
  },
  reducers: {
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    addReservation(state, action) {
      state.list.unshift(action.payload);
      MOCK_RESERVATIONS.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx].status = action.payload.status;
        }
      });
  },
});

export const { setFilterStatus, addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
