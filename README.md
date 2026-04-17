# Techniaa Hotel Booking & Admin Platform

A modern, premium Hotel Reservation System built with React.js, Redux, and Vite.

## Features

- 🏨 **Hotel Listing** — Responsive grid with Flexbox, hover animations, and price fallbacks
- 🔍 **Room Filtering** — Filter by person count with CSS opacity transitions
- 📅 **Reservation Form** — Date pickers, input validation with regex, and loading states
- 💬 **Comments & Reviews** — Star ratings, trim validation, image upload with security checks
- 🛡️ **Authentication** — PrivateRoute guards with login redirect
- ⚙️ **Admin Panel** — Redux-powered reservation management with status filtering

## Tech Stack

- **React.js** (Frontend)
- **Redux Toolkit** (Admin Panel state management)
- **React Router** (Routing & PrivateRoute)
- **react-datepicker** (Date selection)
- **Standard CSS** (Flexbox, responsive design)
- **Vite** (Build tool)

## Quick Start

```bash
npm install
npm run dev
```

Opens at **http://localhost:5173/**

## Demo Credentials

| Role    | Email                  | Password   |
|---------|------------------------|------------|
| User    | user@techniaa.com      | user123    |
| Admin   | admin@techniaa.com     | admin123   |
| Manager | manager@techniaa.com   | manager123 |

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Route pages
├── services/      # API service layer
├── store/         # Redux store & slices
├── hooks/         # Custom React hooks
├── App.jsx        # Route definitions
├── main.jsx       # Entry point
└── index.css      # Design system
```

## Author

**Yazen Emino** — Istanbul Topkapı University, Software Engineering
