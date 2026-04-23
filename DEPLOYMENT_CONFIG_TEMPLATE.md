# 📋 Deployment Configuration Templates

Quick copy-paste templates for deploying to Vercel + Render.

---

## 🔧 RENDER BACKEND CONFIGURATION

### Service Settings:
```
Name: bamboo-paradise-backend
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

---

### Environment Variables (Copy All):

```env
NODE_ENV=production
PORT=5000
DB_HOST=YOUR_RENDER_DB_HOST_HERE
DB_PORT=5432
DB_NAME=bamboo_paradise
DB_USER=bamboo_admin
DB_PASSWORD=YOUR_DB_PASSWORD_HERE
JWT_SECRET=GENERATE_RANDOM_32_CHAR_STRING_HERE
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=https://YOUR_VERCEL_URL_HERE.vercel.app
```

### 🔑 How to Fill:

1. **DB_HOST**: Get from Render PostgreSQL → Info → Internal Database URL
   - Example: `dpg-xxxxx.oregon-postgres.render.com`

2. **DB_PASSWORD**: Get from Render PostgreSQL → Info → Password
   - Example: `a1b2c3d4e5f6g7h8i9j0`

3. **JWT_SECRET**: Generate random 32+ character string
   - Use: https://randomkeygen.com/ (Fort Knox Password)
   - Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Example: `7f3a9b2c8d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9`

4. **EMAIL_USER** & **EMAIL_PASS**: (Optional - can configure later)
   - Gmail: Enable 2FA, generate app password
   - Or leave as placeholder

5. **FRONTEND_URL**: Update after deploying to Vercel
   - Example: `https://bamboo-paradise.vercel.app`

---

## 🗄️ RENDER DATABASE CONFIGURATION

### PostgreSQL Settings:
```
Name: bamboo-paradise-db
Database: bamboo_paradise
User: bamboo_admin
Region: Same as backend (Oregon recommended)
PostgreSQL Version: 15
Plan: Free
```

### After Creation:
1. Go to database → Info tab
2. Copy "Internal Database URL"
3. Parse it for environment variables:
   ```
   postgres://USER:PASSWORD@HOST:PORT/DATABASE
   ```

---

## 🎨 VERCEL FRONTEND CONFIGURATION

### Project Settings:
```
Framework Preset: Next.js (auto-detected)
Root Directory: frontend
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
Node Version: 20.x (auto-detected)
```

---

### Environment Variable (Add This):

```
Key: NEXT_PUBLIC_API_URL
Value: https://YOUR_RENDER_BACKEND_URL.onrender.com/api
```

### 🔑 How to Fill:

1. **Value**: Get from Render backend service URL
   - Example: `https://bamboo-paradise-backend.onrender.com/api`
   - **MUST end with `/api`**

---

## 📝 STEP-BY-STEP DEPLOYMENT ORDER

### 1️⃣ Create Render Database
```
✓ Sign up at render.com
✓ New + → PostgreSQL
✓ Use settings above
✓ Wait for "Available" status
✓ Copy connection details
```

### 2️⃣ Deploy Backend on Render
```
✓ New + → Web Service
✓ Connect GitHub repo
✓ Use backend settings above
✓ Add ALL environment variables
✓ Create Web Service
✓ Wait for deployment (3-5 min)
✓ Copy service URL
```

### 3️⃣ Run Database Migrations
```
✓ Go to backend service
✓ Click "Shell" tab
✓ Run: npm run db:migrate
✓ Run: npm run db:seed
✓ Verify: Should see "✅ Database seeded successfully"
```

### 4️⃣ Deploy Frontend on Vercel
```
✓ Sign up at vercel.com
✓ New Project → Import from GitHub
✓ Use frontend settings above
✓ Add environment variable
✓ Deploy
✓ Wait for deployment (2-3 min)
✓ Copy deployment URL
```

### 5️⃣ Update Backend CORS
```
✓ Go back to Render backend
✓ Environment tab
✓ Update FRONTEND_URL with Vercel URL
✓ Save (auto-redeploys)
```

### 6️⃣ Test Everything
```
✓ Visit Vercel URL
✓ Try login: admin@bambooparadise.com / admin123
✓ Check dashboard loads
✓ Test booking flow
✓ Verify all features work
```

---

## 🔐 SECURITY CHECKLIST

### Immediately After Deployment:

- [ ] Change admin password from `admin123`
- [ ] Change staff password from `staff123`
- [ ] Verify JWT_SECRET is strong (32+ chars)
- [ ] Check CORS is configured (FRONTEND_URL)
- [ ] Test all authentication flows
- [ ] Verify database backups enabled (Render auto-backups)

---

## 🧪 TESTING ENDPOINTS

### Test Backend Health:
```
https://YOUR_BACKEND_URL.onrender.com/api/health
```
Expected response:
```json
{
  "status": "ok",
  "hotel": "Bamboo Paradise Hotel"
}
```

### Test Backend Login:
```bash
curl -X POST https://YOUR_BACKEND_URL.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bambooparadise.com","password":"admin123"}'
```
Expected: Returns user object and token

### Test Frontend:
```
https://YOUR_FRONTEND_URL.vercel.app
```
Expected: Homepage loads with navigation

### Test Frontend Login:
```
https://YOUR_FRONTEND_URL.vercel.app/login
```
Expected: Login page loads, can login successfully

---

## 📊 EXPECTED DEPLOYMENT TIMES

| Step | Time |
|------|------|
| Create Render account | 2 min |
| Create PostgreSQL database | 2 min |
| Deploy backend | 3-5 min |
| Run migrations | 1 min |
| Create Vercel account | 2 min |
| Deploy frontend | 2-3 min |
| Update CORS | 2 min |
| Testing | 5 min |
| **TOTAL** | **20-25 min** |

---

## 💰 COST SUMMARY

### Free Tier (First 90 Days):
```
Render Backend: $0 (750 hours/month)
Render Database: $0 (90 days free trial)
Vercel Frontend: $0 (unlimited)
TOTAL: $0/month
```

### After 90 Days:
```
Render Backend: $0 (still free)
Render Database: $7/month (Starter plan)
Vercel Frontend: $0 (still free)
TOTAL: $7/month
```

### Production Plan:
```
Render Backend: $7/month (Starter)
Render Database: $7/month (Starter)
Vercel Frontend: $20/month (Pro - optional)
TOTAL: $14-34/month
```

---

## 🔄 UPDATE COMMANDS

### Update Backend:
```bash
git add backend/
git commit -m "Update backend"
git push origin main
```
Render auto-deploys in 2-3 minutes.

### Update Frontend:
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
```
Vercel auto-deploys in 1-2 minutes.

---

## 🆘 TROUBLESHOOTING QUICK FIXES

### Login Fails:
```bash
# In Render Shell:
npm run db:seed
```

### CORS Error:
```
Check FRONTEND_URL in Render matches Vercel URL exactly
```

### Database Connection Error:
```
Verify DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
Use Internal Database URL from Render
```

### Frontend Can't Connect:
```
Check NEXT_PUBLIC_API_URL ends with /api
Verify backend is running (check health endpoint)
```

---

## 📞 SUPPORT LINKS

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Repo**: https://github.com/ashe0123/Bamboo-Paradise-Hotel

---

## ✅ FINAL CHECKLIST

- [ ] Render account created
- [ ] PostgreSQL database created
- [ ] Database connection details saved
- [ ] Backend deployed with all env vars
- [ ] Migrations run successfully
- [ ] Backend health check passes
- [ ] Vercel account created
- [ ] Frontend deployed with env var
- [ ] Backend CORS updated
- [ ] Login tested successfully
- [ ] Admin dashboard accessible
- [ ] Passwords changed
- [ ] Deployment URLs saved

---

## 📝 SAVE YOUR URLS

Write down these URLs after deployment:

```
Frontend URL: https://_________________.vercel.app
Backend URL: https://_________________.onrender.com
Database Host: dpg-_________________.oregon-postgres.render.com

Admin Email: admin@bambooparadise.com
Admin Password: _________________ (change from admin123!)

Staff Email: staff@bambooparadise.com
Staff Password: _________________ (change from staff123!)
```

---

**Ready to deploy? Follow DEPLOY_VERCEL_RENDER.md for detailed step-by-step instructions!**
