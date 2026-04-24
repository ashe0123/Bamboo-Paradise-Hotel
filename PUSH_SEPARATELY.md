# 🔀 Push Backend and Frontend as Separate Repositories

## 📋 Overview

This guide shows how to split the monorepo into two separate repositories:
- `Bamboo-Paradise-Backend`
- `Bamboo-Paradise-Frontend`

Like your Wazema project structure! ✅

---

## 🎯 Why Separate Repositories?

1. ✅ **Easier Deployment** - Each service deploys independently
2. ✅ **Cleaner CI/CD** - Separate pipelines for each service
3. ✅ **Better Collaboration** - Frontend and backend teams work independently
4. ✅ **Smaller Repos** - Faster cloning and operations
5. ✅ **Independent Versioning** - Version each service separately

---

## 📦 Step 1: Create GitHub Repositories

### 1.1 Create Backend Repository
1. Go to https://github.com/new
2. Repository name: `Bamboo-Paradise-Backend`
3. Description: `Backend API for Bamboo Paradise Hotel - Node.js + Express + PostgreSQL`
4. Public
5. **Don't** initialize with README
6. Click "Create repository"
7. **Save the URL:** `https://github.com/ashe0123/Bamboo-Paradise-Backend.git`

### 1.2 Create Frontend Repository
1. Go to https://github.com/new
2. Repository name: `Bamboo-Paradise-Frontend`
3. Description: `Frontend for Bamboo Paradise Hotel - Next.js 14 + Tailwind CSS`
4. Public
5. **Don't** initialize with README
6. Click "Create repository"
7. **Save the URL:** `https://github.com/ashe0123/Bamboo-Paradise-Frontend.git`

---

## 🔧 Step 2: Push Backend

Open terminal in your project root and run:

```bash
# Navigate to backend directory
cd backend

# Initialize git
git init

# Configure git
git config user.name "ashe0123"
git config user.email "ashe0123@users.noreply.github.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Bamboo Paradise Hotel Backend API"

# Add remote
git remote add origin https://github.com/ashe0123/Bamboo-Paradise-Backend.git

# Push
git branch -M main
git push -u origin main
```

---

## 🎨 Step 3: Push Frontend

Open a **new terminal** in your project root and run:

```bash
# Navigate to frontend directory
cd frontend

# Initialize git
git init

# Configure git
git config user.name "ashe0123"
git config user.email "ashe0123@users.noreply.github.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Bamboo Paradise Hotel Frontend"

# Add remote
git remote add origin https://github.com/ashe0123/Bamboo-Paradise-Frontend.git

# Push
git branch -M main
git push -u origin main
```

---

## 📝 Step 4: Add README Files

### Backend README.md

Create `backend/README.md`:

```markdown
# 🏨 Bamboo Paradise Hotel - Backend API

RESTful API for hotel management system built with Node.js, Express, and PostgreSQL.

## 🚀 Tech Stack

- Node.js 20+
- Express.js
- PostgreSQL 15
- JWT Authentication
- bcryptjs
- nodemailer

## 📦 Installation

\`\`\`bash
npm install
cp .env.example .env
# Edit .env with your configuration
\`\`\`

## 🗄️ Database Setup

\`\`\`bash
npm run db:migrate
npm run db:seed
\`\`\`

## 🏃 Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Server runs on http://localhost:5000

## 🌐 API Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/rooms` - List rooms
- POST `/api/reservations` - Create reservation
- POST `/api/payments` - Process payment
- And 20+ more endpoints...

## 🔐 Environment Variables

\`\`\`env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bamboo_paradise
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
\`\`\`

## 🚀 Deployment

### Render
1. Create new Web Service
2. Connect this repository
3. Set environment variables
4. Deploy

### Railway
1. Create new project
2. Connect this repository
3. Add PostgreSQL
4. Set environment variables
5. Deploy

## 📚 Documentation

See main repository for complete documentation:
https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 🔗 Related

- Frontend: https://github.com/ashe0123/Bamboo-Paradise-Frontend
- Main Repo: https://github.com/ashe0123/Bamboo-Paradise-Hotel
\`\`\`

### Frontend README.md

Create `frontend/README.md`:

```markdown
# 🏨 Bamboo Paradise Hotel - Frontend

Modern hotel booking interface built with Next.js 14 and Tailwind CSS.

## 🚀 Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios
- React Hot Toast

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🏃 Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## 🔧 Environment Variables

Create `.env.local`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

For production:
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
\`\`\`

## 🎨 Features

- 🏠 Homepage with hotel overview
- 🏨 Room browsing and filtering
- 📅 Booking system with date picker
- 💳 Payment processing
- 👤 User dashboard
- 🔐 Admin panel
- 📱 Fully responsive

## 🚀 Deployment

### Vercel (Recommended)
1. Import this repository
2. Set environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy

### Netlify
1. Import this repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Set environment variable
5. Deploy

## 📚 Documentation

See main repository for complete documentation:
https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 🔗 Related

- Backend: https://github.com/ashe0123/Bamboo-Paradise-Backend
- Main Repo: https://github.com/ashe0123/Bamboo-Paradise-Hotel
\`\`\`

---

## 🔄 Step 5: Update and Push READMEs

### For Backend:
```bash
cd backend
# Create README.md with content above
git add README.md
git commit -m "Add README"
git push
```

### For Frontend:
```bash
cd frontend
# Create README.md with content above
git add README.md
git commit -m "Add README"
git push
```

---

## 📋 Step 6: Update Main Repository

Update the main repository README to link to the separate repos:

```markdown
# 🌿 Bamboo Paradise Hotel

Complete hotel management system with separate frontend and backend.

## 📦 Repositories

- **Backend API:** https://github.com/ashe0123/Bamboo-Paradise-Backend
- **Frontend:** https://github.com/ashe0123/Bamboo-Paradise-Frontend
- **Documentation:** This repository

## 🚀 Quick Start

### Clone Both Repositories:
\`\`\`bash
# Backend
git clone https://github.com/ashe0123/Bamboo-Paradise-Backend.git
cd Bamboo-Paradise-Backend
npm install
npm run dev

# Frontend (in new terminal)
git clone https://github.com/ashe0123/Bamboo-Paradise-Frontend.git
cd Bamboo-Paradise-Frontend
npm install
npm run dev
\`\`\`

## 📚 Documentation

All documentation is in this repository:
- DEPLOYMENT_GUIDE.md
- DEPLOY_VERCEL_RENDER.md
- FEATURES_CHECKLIST.md
- And more...
```

---

## 🎯 Final Repository Structure

After completing these steps, you'll have:

```
1. Bamboo-Paradise-Hotel (Main - Documentation)
   └── All documentation files

2. Bamboo-Paradise-Backend
   └── Backend code only
   └── README.md

3. Bamboo-Paradise-Frontend
   └── Frontend code only
   └── README.md
```

---

## 🚀 Deployment with Separate Repos

### Backend (Render):
1. New Web Service
2. Connect: `Bamboo-Paradise-Backend`
3. No need to set root directory!
4. Deploy

### Frontend (Vercel):
1. New Project
2. Connect: `Bamboo-Paradise-Frontend`
3. No need to set root directory!
4. Deploy

**Much cleaner!** ✅

---

## ✅ Advantages of This Structure

| Aspect | Monorepo | Separate Repos |
|--------|----------|----------------|
| Deployment | Need to set root directory | Direct deployment ✅ |
| CI/CD | Complex setup | Simple per-repo ✅ |
| Team Work | Conflicts possible | Independent work ✅ |
| Clone Time | Slower (both) | Faster (one at a time) ✅ |
| Versioning | Shared | Independent ✅ |

---

## 🔗 Example: Your Wazema Structure

You already have this pattern:
```
ashe0123/wazema-backend   ← Backend only
ashe0123/wazema-frontend  ← Frontend only
```

Now you'll have:
```
ashe0123/Bamboo-Paradise-Backend   ← Backend only
ashe0123/Bamboo-Paradise-Frontend  ← Frontend only
ashe0123/Bamboo-Paradise-Hotel     ← Documentation
```

---

## 📝 Commands Summary

```bash
# Backend
cd backend
git init
git add .
git commit -m "Initial commit: Backend API"
git remote add origin https://github.com/ashe0123/Bamboo-Paradise-Backend.git
git branch -M main
git push -u origin main

# Frontend
cd frontend
git init
git add .
git commit -m "Initial commit: Frontend"
git remote add origin https://github.com/ashe0123/Bamboo-Paradise-Frontend.git
git branch -M main
git push -u origin main
```

---

## 🎉 Done!

You now have a professional repository structure like your Wazema project!

**Next:** Deploy each repository independently to Vercel and Render.
