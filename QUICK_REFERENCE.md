# 🚀 Quick Reference Card

## 🔑 Login Credentials
```
Admin: admin@bambooparadise.com / admin123
Staff: staff@bambooparadise.com / staff123
```

## 🌐 URLs (Local Development)
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
Health:   http://localhost:5000/api/health
```

## ⚡ Quick Commands

### Start Everything (Windows)
```bash
start.bat
```

### Start Everything (Linux/Mac)
```bash
./start.sh
```

### Backend Only
```bash
cd backend
npm run dev
```

### Frontend Only
```bash
cd frontend
npm run dev
```

### Database Setup
```bash
cd backend
npm run db:migrate  # Create tables
npm run db:seed     # Add sample data
```

### Docker
```bash
docker-compose up -d        # Start all services
docker-compose down         # Stop all services
docker-compose logs -f      # View logs
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend configuration |
| `frontend/.env.local` | Frontend configuration |
| `backend/src/server.js` | Main backend entry |
| `frontend/src/app/page.js` | Home page |
| `DEPLOYMENT_GUIDE.md` | Full deployment guide |
| `FEATURES_CHECKLIST.md` | All features list |

## 🗄️ Database

**Connection String Format:**
```
postgresql://user:password@host:port/database
```

**Default Local:**
```
Host: localhost
Port: 5432
Database: bamboo_paradise
User: postgres
Password: yourpassword
```

## 🔌 Key API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Rooms
```
GET  /api/rooms
GET  /api/rooms/:id
GET  /api/rooms/categories
```

### Reservations
```
POST /api/reservations
GET  /api/reservations/my
GET  /api/reservations/:id
PUT  /api/reservations/:id/status
```

### Payments
```
POST /api/payments
GET  /api/payments
```

### Services
```
GET  /api/services
POST /api/services/request
```

### Reviews
```
POST /api/reviews
GET  /api/reviews
```

### Contact
```
POST /api/contact
GET  /api/contact/messages
```

## 🚀 Deployment Options

### Option 1: Railway + Vercel (Easiest)
1. Push to GitHub
2. Deploy backend on Railway
3. Deploy frontend on Vercel
4. **Time:** 30 minutes

### Option 2: Docker (Fastest)
```bash
docker-compose up -d
```
**Time:** 5 minutes

### Option 3: Traditional VPS
1. Install Node.js + PostgreSQL
2. Clone repository
3. Configure environment
4. Use PM2 for process management
**Time:** 1-2 hours

## 💰 Hosting Costs

| Tier | Platform | Cost |
|------|----------|------|
| Free | Railway + Vercel + Supabase | $0/month |
| Starter | Railway Pro | $6/month |
| Production | Railway + Vercel Pro | $30-50/month |

## 🔒 Security Checklist

- [x] Passwords hashed (bcrypt)
- [x] JWT authentication
- [x] SQL injection prevention
- [x] XSS protection
- [x] CORS configured
- [x] Input validation
- [ ] Rate limiting (enable in production)
- [ ] HTTPS/SSL (automatic on Vercel/Railway)

## 📊 System Capabilities

### Guest Features
- Register & login
- Browse rooms
- Make reservations
- Pay online (4 methods)
- Request services
- Submit reviews
- View booking history

### Admin Features
- Dashboard with statistics
- Manage all reservations
- Check-in/check-out guests
- Room management
- Service request tracking
- Review moderation
- Message inbox
- Revenue reports

## 🛠️ Troubleshooting

### Login not working?
```bash
cd backend
node fix-users.js
```

### Database connection error?
1. Check PostgreSQL is running
2. Verify credentials in `.env`
3. Check database exists

### Port already in use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Frontend can't connect to backend?
1. Check backend is running on port 5000
2. Verify `NEXT_PUBLIC_API_URL` in frontend/.env.local
3. Check CORS settings in backend

## 📞 Support Resources

- **Deployment Guide:** DEPLOYMENT_GUIDE.md
- **Feature List:** FEATURES_CHECKLIST.md
- **Business Guide:** READY_TO_DEPLOY.md
- **Main README:** README.md

## ⚡ Performance Tips

1. Enable database indexes (already done)
2. Use connection pooling (already configured)
3. Enable rate limiting in production
4. Use CDN for static assets
5. Enable gzip compression
6. Monitor with Sentry (optional)

## 🎯 Next Steps

1. ✅ System is running locally
2. ✅ Login credentials work
3. 📖 Read DEPLOYMENT_GUIDE.md
4. 🚀 Choose deployment platform
5. ⚙️ Configure production environment
6. 🌐 Deploy
7. 🎉 Start taking bookings!

---

**Need help?** Check the documentation files or deployment guide.

**Ready to deploy?** See DEPLOYMENT_GUIDE.md for step-by-step instructions.
