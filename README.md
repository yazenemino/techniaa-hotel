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

- **React.js 19** (Frontend UI)
- **Redux Toolkit 2** (Admin Panel state management)
- **React Router v7** (Routing & PrivateRoute)
- **react-datepicker** (Date selection)
- **Standard CSS** (Flexbox, responsive design)
- **Vite 8** (Build tool & dev server)

## Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Minimum Version | Check |
|------|----------------|-------|
| [Node.js](https://nodejs.org/) | 18.x or higher | `node -v` |
| npm | 9.x or higher | `npm -v` |

> **Tip:** Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node.js versions.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yazenemino/techniaa-hotel.git
   cd techniaa-hotel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open at **http://localhost:5173/**

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server with hot-module replacement |
| `npm run build` | Build the app for production into the `dist/` folder |
| `npm run preview` | Serve the production build locally for verification |

## Production Build

To create an optimised production build:

```bash
npm run build
```

The compiled output is written to the `dist/` directory. To verify it locally before deploying:

```bash
npm run preview
```

The preview server starts at **http://localhost:4173/** by default.

## Demo Credentials

The app uses mock authentication — no real backend is required. Use any of the accounts below to explore different roles:

| Role    | Email                  | Password   | Access |
|---------|------------------------|------------|--------|
| User    | user@techniaa.com      | user123    | Browse hotels, make reservations, leave reviews |
| Admin   | admin@techniaa.com     | admin123   | Full admin panel access |
| Manager | manager@techniaa.com   | manager123 | Admin panel access |

> **Note:** All data (hotels, reservations, comments) is stored in memory and resets on page refresh.

## Project Structure

```
techniaa-hotel/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CommentSection.jsx
│   │   ├── HotelCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── RoomList.jsx
│   ├── pages/             # Route-level page components
│   │   ├── AdminPanel.jsx
│   │   ├── Home.jsx
│   │   ├── HotelDetail.jsx
│   │   ├── Login.jsx
│   │   └── ReservationForm.jsx
│   ├── services/          # Mock API service layer
│   │   ├── authService.js
│   │   └── hotelService.js
│   ├── store/             # Redux store & slices
│   │   ├── index.js
│   │   └── reservationSlice.js
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.js
│   ├── App.jsx            # Route definitions
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global design system
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
└── package.json
```

## Troubleshooting

**`npm install` fails with permission errors**
Try clearing the npm cache and reinstalling:
```bash
npm cache clean --force
npm install
```

**Port 5173 is already in use**
Vite will automatically try the next available port. Alternatively, specify a custom port:
```bash
npm run dev -- --port 3000
```

**Blank page after `npm run build` / `npm run preview`**
Ensure you are running `npm run preview` from the project root after a successful build. If the `dist/` folder is missing, run `npm run build` first.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## Author

**Yazen Emino** — Istanbul Topkapı University, Software Engineering
