# 📁 Repository Structure

## 🌿 Bamboo Paradise Hotel - Monorepo

This repository contains both the **frontend** and **backend** in a single monorepo structure.

---

## 📂 Directory Structure

```
Bamboo-Paradise-Hotel/
├── 📁 backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── database/        # DB migrations & seeds
│   │   ├── middleware/      # Auth, validation, rate limiting
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Main entry point
│   ├── .env.example         # Environment template
│   ├── Dockerfile           # Backend container
│   └── package.json         # Backend dependencies
│
├── 📁 frontend/             # Next.js 14 Application
│   ├── src/
│   │   ├── app/             # Next.js pages (App Router)
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth)
│   │   └── lib/             # API client & utilities
│   ├── .env.local           # Frontend environment
│   ├── Dockerfile           # Frontend container
│   └── package.json         # Frontend dependencies
│
├── 📄 docker-compose.yml    # Full stack Docker setup
├── 📄 .gitignore            # Git ignore rules
├── 📄 README.md             # Main documentation
├── 📄 DEPLOYMENT_GUIDE.md   # Deployment instructions
├── 📄 FEATURES_CHECKLIST.md # Complete feature list
├── 📄 QUICK_REFERENCE.md    # Quick commands
├── 📄 READY_TO_DEPLOY.md    # Production readiness
├── 📄 ROLES_AND_PERMISSIONS.md # User roles explained
├── 📄 start.bat             # Windows startup script
└── 📄 start.sh              # Linux/Mac startup script
```

---

## 🚀 Quick Start

### Option 1: Run Both (Recommended for Development)
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

### Option 2: Run Separately

#### Backend Only
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:migrate
npm run db:seed
npm run dev
```

#### Frontend Only
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Docker (Full Stack)
```bash
docker-compose up -d
```

---

## 🌐 Deployment Options

### Separate Deployment (Recommended)

#### Backend → Railway
1. Create new project on Railway
2. Connect this GitHub repository
3. Set root directory: `backend`
4. Add PostgreSQL database
5. Set environment variables
6. Deploy

#### Frontend → Vercel
1. Import this GitHub repository
2. Set root directory: `frontend`
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Monorepo Deployment

Some platforms support monorepo deployment:
- **Railway**: Can deploy both with separate services
- **Render**: Supports monorepo with multiple services
- **DigitalOcean App Platform**: Supports monorepo

---

## 📦 What's Included

### Backend (`/backend`)
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database
- ✅ JWT authentication
- ✅ 25+ API endpoints
- ✅ Role-based access control
- ✅ Input validation
- ✅ Rate limiting
- ✅ Email service
- ✅ Payment processing

### Frontend (`/frontend`)
- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS styling
- ✅ Responsive design
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Guest portal
- ✅ Booking system
- ✅ Payment interface

### Documentation
- ✅ Complete deployment guide
- ✅ Feature checklist
- ✅ Quick reference
- ✅ Role permissions
- ✅ Docker setup

---

## 🔗 Repository Links

**GitHub:** https://github.com/ashe0123/Bamboo-Paradise-Hotel

**Clone:**
```bash
git clone https://github.com/ashe0123/Bamboo-Paradise-Hotel.git
cd Bamboo-Paradise-Hotel
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project overview |
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment |
| `FEATURES_CHECKLIST.md` | All features (95% complete) |
| `QUICK_REFERENCE.md` | Commands & credentials |
| `READY_TO_DEPLOY.md` | Production readiness |
| `ROLES_AND_PERMISSIONS.md` | User roles explained |
| `REPOSITORY_STRUCTURE.md` | This file |

---

## 🔑 Default Credentials

After running `npm run db:seed`:

```
Admin:
  Email: admin@bambooparadise.com
  Password: admin123

Staff:
  Email: staff@bambooparadise.com
  Password: staff123
```

---

## 🛠️ Technology Stack

### Backend
- Node.js 20+
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- nodemailer

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Axios
- React Hot Toast
- React DatePicker

### DevOps
- Docker & Docker Compose
- Git
- PM2 (optional)

---

## 📊 Project Status

**Completion:** 95% Production Ready

**What's Complete:**
- ✅ All core features
- ✅ Authentication & authorization
- ✅ Database schema
- ✅ API endpoints
- ✅ Frontend UI
- ✅ Admin dashboard
- ✅ Payment system
- ✅ Documentation

**Optional Enhancements:**
- ⚠️ Image uploads (Cloudinary/S3)
- ⚠️ Email SMTP configuration
- ⚠️ Real payment gateway (Stripe)

---

## 🤝 Contributing

This is a complete hotel management system. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

---

## 📄 License

This project is open source and available for educational and commercial use.

---

## 🆘 Support

For deployment help, see:
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `QUICK_REFERENCE.md` - Quick commands
- GitHub Issues - Report problems

---

## 🎯 Next Steps

1. ✅ Repository pushed to GitHub
2. 📖 Read DEPLOYMENT_GUIDE.md
3. 🚀 Choose deployment platform
4. 🌐 Deploy backend and frontend
5. 🎉 Start taking reservations!

---

**Repository:** https://github.com/ashe0123/Bamboo-Paradise-Hotel
