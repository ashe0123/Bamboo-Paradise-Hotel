# 🏨 Bamboo Paradise Hotel - Backend API

RESTful API for hotel management system built with Node.js, Express, and PostgreSQL.

## 🚀 Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL 15
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Email:** nodemailer
- **CORS:** cors

## 📦 Installation

```bash
npm install
cp .env.example .env
# Edit .env with your configuration
```

## 🗄️ Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

## 🏃 Run Development Server

```bash
npm run dev
```

Server runs on **http://localhost:5000**

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Rooms
- `GET /api/rooms` - List rooms (with filters)
- `GET /api/rooms/:id` - Get room details
- `GET /api/rooms/categories` - List categories
- `POST /api/rooms` - Create room (admin)
- `PUT /api/rooms/:id` - Update room

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my` - My reservations
- `GET /api/reservations/:id` - Get reservation
- `GET /api/reservations` - All reservations (staff/admin)
- `PUT /api/reservations/:id/status` - Update status

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments` - All payments (admin)

### Services
- `GET /api/services` - List services
- `POST /api/services/request` - Request service
- `GET /api/services/requests` - All requests (staff/admin)

### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews` - Published reviews
- `PUT /api/reviews/:id/publish` - Toggle publish (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - All messages (staff/admin)

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bamboo_paradise
DB_USER=postgres
DB_PASSWORD=yourpassword

# JWT
JWT_SECRET=your_super_secure_jwt_secret_min_32_chars
JWT_EXPIRES_IN=7d

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Input validation
- ✅ Rate limiting

## 🚀 Deployment

### Render
1. Create new Web Service
2. Connect this repository
3. Set environment variables
4. Deploy

### Railway
1. Create new project
2. Connect this repository
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

## 📊 Database Schema

- **users** - User accounts (guest, staff, admin)
- **room_categories** - Room types and pricing
- **rooms** - Individual rooms
- **reservations** - Booking records
- **payments** - Payment transactions
- **services** - Available hotel services
- **service_requests** - Guest service requests
- **reviews** - Guest reviews and ratings
- **contact_messages** - Contact form submissions

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bambooparadise.com","password":"admin123"}'
```

## 📚 Documentation

See main repository for complete documentation:
https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 🔗 Related Repositories

- **Frontend:** https://github.com/ashe0123/Bamboo-Paradise-Frontend
- **Main Repo (Documentation):** https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 👤 Default Credentials

After seeding:
```
Admin: admin@bambooparadise.com / admin123
Staff: staff@bambooparadise.com / staff123
```

⚠️ **Change these in production!**

## 📄 License

Open source - Free to use for learning and commercial purposes.
