import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import HotelDetail from './pages/HotelDetail.jsx';
import ReservationForm from './pages/ReservationForm.jsx';
import Login from './pages/Login.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/reserve/:hotelId/:roomId"
            element={
              <PrivateRoute>
                <ReservationForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
