import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './reservationSlice.js';

export const store = configureStore({
  reducer: {
    reservations: reservationReducer,
  },
});
