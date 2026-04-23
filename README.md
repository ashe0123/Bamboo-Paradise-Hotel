# 🌿 Bamboo Paradise Hotel — Full Stack System

A complete hotel management system with online reservations, guest portal, and admin dashboard.

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend  | Node.js, Express.js     |
| Database | PostgreSQL               |
| Auth     | JWT (jsonwebtoken)       |

---

## Features

### Guest Portal
- Browse & search available rooms with date filtering
- Online room reservation with pricing calculator
- Online payment (credit card, debit, bank transfer, cash)
- View & manage reservations
- Request hotel services (spa, restaurant, laundry, transport)
- Submit reviews after checkout

### Admin / Staff Dashboard
- Live dashboard with stats (rooms, check-ins, revenue)
- Manage all reservations (confirm, check-in, check-out, cancel)
- Room management (add rooms, update status)
- Service request tracking
- Review moderation (publish/unpublish)
- Contact message inbox

---

## 🚀 Quick Start

### Option 1: Automated Start (Windows)
```bash
start.bat
```

### Option 2: Automated Start (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Manual Setup

#### 1. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE bamboo_paradise;
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

npm run db:migrate   # Create all tables
npm run db:seed      # Seed sample data
npm run dev          # Start API on port 5000
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
# .env.local is already configured for localhost

npm run dev          # Start Next.js on port 3000
```

### Option 4: Docker (Production-Ready)
```bash
docker-compose up -d
```

---

## Default Credentials (after seeding)

| Role  | Email                          | Password   |
|-------|--------------------------------|------------|
| Admin | admin@bambooparadise.com       | admin123   |
| Staff | staff@bambooparadise.com       | staff123   |

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions for production
- **[FEATURES_CHECKLIST.md](FEATURES_CHECKLIST.md)** - Full feature list and system completeness

---

## 🎯 System Status

**✅ 95% Production Ready**

All core features are complete and functional:
- ✅ User authentication & authorization
- ✅ Room management & booking
- ✅ Payment processing
- ✅ Service requests
- ✅ Review system
- ✅ Admin dashboard
- ✅ Real-world business logic

**What's needed for production:**
1. Choose hosting platform (Railway, Vercel, AWS, etc.)
2. Set up production database
3. Configure environment variables
4. Deploy (30-60 minutes)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## API Endpoints

| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| POST   | /api/auth/register                | Guest registration       |
| POST   | /api/auth/login                   | Login                    |
| GET    | /api/rooms                        | List rooms (with filters)|
| GET    | /api/rooms/categories             | Room categories          |
| POST   | /api/reservations                 | Create reservation       |
| GET    | /api/reservations/my              | My reservations          |
| PUT    | /api/reservations/:id/status      | Update status (admin)    |
| GET    | /api/services                     | List services            |
| POST   | /api/services/request             | Request a service        |
| POST   | /api/payments                     | Process payment          |
| POST   | /api/reviews                      | Submit review            |
| POST   | /api/contact                      | Send contact message     |
| GET    | /api/contact/dashboard/stats      | Dashboard stats (admin)  |
