# Bike Taxi Frontend

Ocean Professional-themed Next.js app for booking bike taxis, managing rides, driver tools, trip status, and payments.

## Environment

Create a `.env` file using `.env.example` as reference:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The backend spec is integrated via REST endpoints defined in the backend OpenAPI.

## Develop

- Install dependencies and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- Auth: Sign up, Login, Logout
- Passenger: Book Ride, Ride History
- Driver: Dashboard (create/update profile, toggle availability)
- Trips: Status page with live updates polling
- Payments: Initiate payment for a ride

## Notes

- Auth token is stored in localStorage as `token` after login.
- All API calls use `NEXT_PUBLIC_API_BASE_URL`.
- Minimal map placeholders are provided; integrate a real maps provider if needed.
