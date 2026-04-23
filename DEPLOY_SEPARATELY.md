# 🚀 Deploy Frontend & Backend Separately

## Overview

This guide shows how to deploy the frontend and backend as separate services, which is the **recommended approach** for production.

---

## 🎯 Deployment Strategy

```
Frontend (Vercel)  →  Backend (Railway)  →  Database (Railway PostgreSQL)
     ↓                      ↓                        ↓
  Port 3000            Port 5000                 Port 5432
```

---

## 📦 Option 1: Railway (Backend) + Vercel (Frontend)

### ✅ Advantages:
- Both have generous free tiers
- Automatic HTTPS/SSL
- Easy GitHub integration
- Auto-deploy on push
- **Total Cost: $0/month to start**

---

## 🔧 Step 1: Deploy Backend on Railway

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Verify your account

### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose: `ashe0123/Bamboo-Paradise-Hotel`
4. Railway will detect the monorepo

### 1.3 Configure Backend Service
1. Click "Add Service" → "GitHub Repo"
2. **Important:** Set root directory to `backend`
   - Settings → Root Directory → `backend`
3. Railway will auto-detect Node.js

### 1.4 Add PostgreSQL Database
1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway will create a database automatically
3. Note the connection details (automatically available as env vars)

### 1.5 Set Environment Variables
Go to backend service → Variables → Add these:

```env
NODE_ENV=production
PORT=5000

# Database (Railway provides these automatically)
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secure_random_jwt_secret_min_32_characters

# JWT Expiration
JWT_EXPIRES_IN=7d

# Email (optional - configure later)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (will update after deploying frontend)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 1.6 Run Database Migrations
1. Go to backend service
2. Click "Settings" → "Deploy"
3. After first deploy, open the service
4. Click "Terminal" or use Railway CLI
5. Run:
```bash
npm run db:migrate
npm run db:seed
```

### 1.7 Get Backend URL
1. Go to backend service → Settings
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://bamboo-paradise-backend.up.railway.app`)
4. Save this for frontend configuration

---

## 🎨 Step 2: Deploy Frontend on Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Verify your account

### 2.2 Import Project
1. Click "Add New" → "Project"
2. Import `ashe0123/Bamboo-Paradise-Hotel`
3. Vercel will detect Next.js

### 2.3 Configure Frontend
**Important Settings:**

**Root Directory:**
```
frontend
```

**Framework Preset:**
```
Next.js
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
.next
```

### 2.4 Set Environment Variable
Add this environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app/api
```

Replace with your actual Railway backend URL from Step 1.7

### 2.5 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Get your frontend URL (e.g., `https://bamboo-paradise.vercel.app`)

---

## 🔄 Step 3: Update Backend CORS

### 3.1 Update FRONTEND_URL in Railway
1. Go back to Railway
2. Open backend service
3. Go to Variables
4. Update `FRONTEND_URL` with your Vercel URL:
```env
FRONTEND_URL=https://bamboo-paradise.vercel.app
```

### 3.2 Redeploy Backend
Railway will automatically redeploy with the new environment variable.

---

## ✅ Step 4: Test the Deployment

### 4.1 Test Backend
Visit: `https://your-backend-url.up.railway.app/api/health`

Should return:
```json
{
  "status": "ok",
  "hotel": "Bamboo Paradise Hotel"
}
```

### 4.2 Test Frontend
1. Visit: `https://your-frontend-url.vercel.app`
2. Go to Login page
3. Try logging in:
   - Email: `admin@bambooparadise.com`
   - Password: `admin123`

### 4.3 Test Full Flow
1. Browse rooms
2. Make a test reservation
3. Check admin dashboard
4. Verify everything works

---

## 📦 Option 2: Both on Railway

### Advantages:
- Single platform
- Easier management
- Shared database access

### Steps:

1. **Create Railway Project**
2. **Add PostgreSQL Database**
3. **Add Backend Service**
   - Root directory: `backend`
   - Set environment variables
   - Generate domain
4. **Add Frontend Service**
   - Root directory: `frontend`
   - Set `NEXT_PUBLIC_API_URL` to backend URL
   - Generate domain

---

## 📦 Option 3: Both on Render

### Steps:

1. **Create Render Account** (https://render.com)
2. **Create PostgreSQL Database**
3. **Create Backend Web Service**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables
4. **Create Frontend Static Site**
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `.next`
   - Add environment variables

---

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET (min 32 characters)
- [ ] Configure CORS properly (FRONTEND_URL)
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set up email service (optional)
- [ ] Enable rate limiting (already in code)
- [ ] Review environment variables
- [ ] Test all features
- [ ] Set up database backups

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Starting)
- **Railway**: $5 free credit/month (enough for backend + DB)
- **Vercel**: Unlimited frontend hosting
- **Total**: $0/month

### Paid Tier (For Growth)
- **Railway**: $5-20/month (backend + database)
- **Vercel**: $20/month (Pro features)
- **Total**: $25-40/month

---

## 🔄 Auto-Deploy Setup

### Railway (Backend)
1. Go to backend service → Settings
2. Enable "Auto-Deploy"
3. Select branch: `main`
4. Every push to `main` will auto-deploy

### Vercel (Frontend)
1. Go to project settings
2. Git → Production Branch: `main`
3. Every push to `main` will auto-deploy

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
**Check:**
1. `NEXT_PUBLIC_API_URL` is correct
2. Backend URL includes `/api` at the end
3. Backend is running (check Railway logs)
4. CORS is configured (FRONTEND_URL in backend)

### Database connection error
**Check:**
1. Database is running on Railway
2. Environment variables are set correctly
3. Database credentials are correct
4. Run migrations: `npm run db:migrate`

### Login not working
**Check:**
1. Database is seeded: `npm run db:seed`
2. JWT_SECRET is set
3. Backend API is responding
4. Check browser console for errors

---

## 📊 Monitoring

### Railway
- View logs: Service → Logs
- View metrics: Service → Metrics
- Database usage: Database → Metrics

### Vercel
- View deployments: Project → Deployments
- View analytics: Project → Analytics
- View logs: Deployment → Function Logs

---

## 🔄 Update Deployment

### Update Backend
```bash
git add backend/
git commit -m "Update backend"
git push
```
Railway will auto-deploy.

### Update Frontend
```bash
git add frontend/
git commit -m "Update frontend"
git push
```
Vercel will auto-deploy.

---

## 📚 Additional Resources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **PostgreSQL on Railway**: https://docs.railway.app/databases/postgresql

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Railway
- [ ] PostgreSQL database created
- [ ] Database migrations run
- [ ] Database seeded with admin account
- [ ] Backend environment variables set
- [ ] Backend domain generated
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable set (NEXT_PUBLIC_API_URL)
- [ ] Backend CORS updated (FRONTEND_URL)
- [ ] Test login works
- [ ] Test booking flow
- [ ] Change default passwords
- [ ] Set up custom domain (optional)
- [ ] Configure email service (optional)

---

## 🎉 Success!

Your Bamboo Paradise Hotel is now live and ready to accept reservations!

**Frontend:** https://your-app.vercel.app
**Backend:** https://your-api.railway.app
**Admin:** admin@bambooparadise.com / admin123

---

## 🆘 Need Help?

- Check Railway logs for backend errors
- Check Vercel logs for frontend errors
- Review DEPLOYMENT_GUIDE.md for more details
- Open GitHub issue for support
