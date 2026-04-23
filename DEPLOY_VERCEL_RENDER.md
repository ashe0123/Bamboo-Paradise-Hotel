# 🚀 Deploy to Vercel (Frontend) + Render (Backend)

## 📋 Complete Deployment Guide

This guide provides **step-by-step instructions** with all configurations needed.

---

## 🎯 Deployment Architecture

```
Frontend (Vercel) → Backend (Render) → PostgreSQL (Render)
```

**Advantages:**
- ✅ Both have free tiers
- ✅ Automatic HTTPS/SSL
- ✅ Easy GitHub integration
- ✅ Auto-deploy on push
- ✅ Reliable and fast

---

## 📝 Pre-Deployment Checklist

Before starting, have these ready:
- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Render account (sign up at https://render.com)
- [ ] Your repository: https://github.com/ashe0123/Bamboo-Paradise-Hotel

---

# 🔧 PART 1: Deploy Backend on Render

## Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

---

## Step 2: Create PostgreSQL Database

1. From Render Dashboard, click "New +"
2. Select "PostgreSQL"
3. Configure database:

```
Name: bamboo-paradise-db
Database: bamboo_paradise
User: bamboo_admin
Region: Choose closest to your users (e.g., Oregon, Frankfurt, Singapore)
PostgreSQL Version: 15
Plan: Free
```

4. Click "Create Database"
5. **IMPORTANT:** Save these connection details (you'll need them):

```
Internal Database URL: (starts with postgres://...)
External Database URL: (starts with postgres://...)
PSQL Command: (for manual access)
```

6. Wait for database to be ready (Status: Available)

---

## Step 3: Create Backend Web Service

1. From Render Dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository: `ashe0123/Bamboo-Paradise-Hotel`
4. Configure the service:

### Basic Settings:
```
Name: bamboo-paradise-backend
Region: Same as database (e.g., Oregon)
Branch: main
Root Directory: backend
Runtime: Node
```

### Build & Deploy:
```
Build Command: npm install
Start Command: npm start
```

### Plan:
```
Instance Type: Free
```

---

## Step 4: Configure Backend Environment Variables

Click "Environment" tab and add these variables:

### Copy and paste these (update the values):

```env
# Node Environment
NODE_ENV=production
PORT=5000

# Database - Get from Render PostgreSQL Dashboard
# Click on your database → Connection → Internal Database URL
DATABASE_URL=postgres://bamboo_admin:password@dpg-xxxxx.oregon-postgres.render.com/bamboo_paradise

# OR use individual variables (Render provides these automatically)
PGHOST=dpg-xxxxx.oregon-postgres.render.com
PGPORT=5432
PGDATABASE=bamboo_paradise
PGUSER=bamboo_admin
PGPASSWORD=your_database_password

# Database connection for our app (use Render's internal URL)
DB_HOST=dpg-xxxxx.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=bamboo_paradise
DB_USER=bamboo_admin
DB_PASSWORD=your_database_password

# JWT Secret - Generate a strong random string (min 32 characters)
# Use this generator: https://randomkeygen.com/ or create your own
JWT_SECRET=bamboo_paradise_2024_super_secure_jwt_secret_key_min_32_chars_random

# JWT Expiration
JWT_EXPIRES_IN=7d

# Email Configuration (Optional - can configure later)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-hotel-email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL (will update after deploying frontend)
# For now, use a placeholder
FRONTEND_URL=https://bamboo-paradise.vercel.app
```

### 🔑 How to Get Database Connection Details:

1. Go to Render Dashboard
2. Click on your PostgreSQL database
3. Go to "Info" or "Connect" tab
4. Copy the **Internal Database URL** (faster, recommended)
5. Parse it into individual variables:
   ```
   postgres://USER:PASSWORD@HOST:PORT/DATABASE
   ```

---

## Step 5: Deploy Backend

1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait 3-5 minutes for deployment
4. Check logs for any errors

### Expected Output in Logs:
```
🏨 Bamboo Paradise Hotel API running on port 5000
```

---

## Step 6: Get Backend URL

1. Once deployed, you'll see your service URL at the top
2. It will look like: `https://bamboo-paradise-backend.onrender.com`
3. **SAVE THIS URL** - you'll need it for frontend

### Test Backend:
Visit: `https://bamboo-paradise-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "hotel": "Bamboo Paradise Hotel"
}
```

---

## Step 7: Run Database Migrations

### Option A: Using Render Shell (Recommended)

1. Go to your backend service on Render
2. Click "Shell" tab (top right)
3. Run these commands:

```bash
npm run db:migrate
npm run db:seed
```

### Option B: Using Local Connection

1. Install PostgreSQL client locally
2. Use the External Database URL from Render
3. Run migrations locally:

```bash
cd backend
# Set DATABASE_URL environment variable
export DATABASE_URL="postgres://bamboo_admin:password@dpg-xxxxx.oregon-postgres.render.com/bamboo_paradise"
npm run db:migrate
npm run db:seed
```

### Verify Database:
```bash
# In Render Shell
node -e "const pool = require('./src/database/db'); pool.query('SELECT COUNT(*) FROM users').then(r => console.log('Users:', r.rows[0].count)).finally(() => pool.end());"
```

Should show: `Users: 2` (admin and staff)

---

# 🎨 PART 2: Deploy Frontend on Vercel

## Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel

---

## Step 2: Import Project

1. From Vercel Dashboard, click "Add New..." → "Project"
2. Import `ashe0123/Bamboo-Paradise-Hotel`
3. Vercel will detect it's a Next.js project

---

## Step 3: Configure Frontend

### Framework Preset:
```
Next.js (auto-detected)
```

### Root Directory:
```
frontend
```

### Build Settings:
```
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
```

---

## Step 4: Add Environment Variable

Click "Environment Variables" and add:

```
Key: NEXT_PUBLIC_API_URL
Value: https://bamboo-paradise-backend.onrender.com/api
```

**IMPORTANT:** 
- Replace with YOUR actual Render backend URL
- Must end with `/api`
- Must start with `https://`

---

## Step 5: Deploy Frontend

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Vercel will show deployment progress

### Expected Output:
```
✓ Building...
✓ Compiled successfully
✓ Deployment ready
```

---

## Step 6: Get Frontend URL

1. Once deployed, you'll see your URL
2. It will look like: `https://bamboo-paradise.vercel.app`
3. Or custom: `https://your-custom-domain.vercel.app`

---

# 🔄 PART 3: Connect Frontend & Backend

## Step 1: Update Backend CORS

1. Go back to Render
2. Open your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` variable:

```env
FRONTEND_URL=https://bamboo-paradise.vercel.app
```

Replace with your actual Vercel URL.

5. Save changes
6. Render will automatically redeploy

---

## Step 2: Test the Connection

### Test Backend Health:
```
https://bamboo-paradise-backend.onrender.com/api/health
```

### Test Frontend:
```
https://bamboo-paradise.vercel.app
```

### Test Login:
1. Go to: `https://bamboo-paradise.vercel.app/login`
2. Login with:
   - Email: `admin@bambooparadise.com`
   - Password: `admin123`
3. Should redirect to admin dashboard

---

# ✅ PART 4: Verification Checklist

Test these features:

- [ ] Frontend loads correctly
- [ ] Login works (admin and staff)
- [ ] Dashboard shows statistics
- [ ] Can browse rooms
- [ ] Can create a reservation
- [ ] Can process payment
- [ ] Can request services
- [ ] Admin can manage reservations
- [ ] Admin can view messages
- [ ] All pages load without errors

---

# 📋 Complete Configuration Summary

## 🔧 Backend Environment Variables (Render)

```env
NODE_ENV=production
PORT=5000

# Database (from Render PostgreSQL)
DB_HOST=dpg-xxxxx.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=bamboo_paradise
DB_USER=bamboo_admin
DB_PASSWORD=your_database_password

# JWT
JWT_SECRET=bamboo_paradise_2024_super_secure_jwt_secret_key_min_32_chars_random
JWT_EXPIRES_IN=7d

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-hotel-email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL (from Vercel)
FRONTEND_URL=https://bamboo-paradise.vercel.app
```

## 🎨 Frontend Environment Variables (Vercel)

```env
NEXT_PUBLIC_API_URL=https://bamboo-paradise-backend.onrender.com/api
```

---

# 🔒 Security Configuration

## Change Default Passwords

After deployment, immediately:

1. Login as admin
2. Go to Profile → Change Password
3. Update from `admin123` to a strong password
4. Do the same for staff account

## Generate Strong JWT Secret

Use one of these methods:

### Method 1: Online Generator
Visit: https://randomkeygen.com/
Copy a "Fort Knox Password"

### Method 2: Command Line
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Method 3: Manual
Create a random string with at least 32 characters mixing:
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

---

# 💰 Cost Breakdown

## Free Tier (Perfect for Starting)

### Render:
- **Web Service**: 750 hours/month free
- **PostgreSQL**: 90 days free, then $7/month
- **Bandwidth**: 100 GB/month free

### Vercel:
- **Hosting**: Unlimited
- **Bandwidth**: 100 GB/month
- **Builds**: 6,000 minutes/month

**Total First 3 Months**: $0
**After 3 Months**: $7/month (database only)

## Paid Tier (For Production)

### Render:
- **Web Service**: $7/month (Starter)
- **PostgreSQL**: $7/month (Starter)
- **Total**: $14/month

### Vercel:
- **Pro Plan**: $20/month (optional, for team features)

**Total**: $14-34/month

---

# 🔄 Auto-Deploy Setup

## Render (Backend)
✅ Already configured!
- Every push to `main` branch auto-deploys
- Can configure in: Settings → Build & Deploy

## Vercel (Frontend)
✅ Already configured!
- Every push to `main` branch auto-deploys
- Can configure in: Settings → Git

---

# 🐛 Troubleshooting

## Frontend Can't Connect to Backend

**Symptoms:** Login fails, "Network Error"

**Solutions:**
1. Check `NEXT_PUBLIC_API_URL` in Vercel
2. Verify backend URL ends with `/api`
3. Check backend is running (visit health endpoint)
4. Check browser console for CORS errors
5. Verify `FRONTEND_URL` in Render backend

## Database Connection Error

**Symptoms:** Backend logs show "connection refused"

**Solutions:**
1. Verify database is running on Render
2. Check `DB_HOST`, `DB_PORT`, `DB_NAME` are correct
3. Use Internal Database URL (faster)
4. Check database status in Render dashboard

## Login Returns "Invalid Credentials"

**Solutions:**
1. Verify database was seeded: `npm run db:seed`
2. Check backend logs for errors
3. Run verify-users script in Render Shell:
   ```bash
   node verify-users.js
   ```

## Render Service Won't Start

**Solutions:**
1. Check logs in Render dashboard
2. Verify `package.json` has `start` script
3. Check all environment variables are set
4. Verify `Root Directory` is set to `backend`

## Vercel Build Fails

**Solutions:**
1. Check build logs in Vercel
2. Verify `Root Directory` is set to `frontend`
3. Check `NEXT_PUBLIC_API_URL` is set
4. Try manual deploy from Vercel dashboard

---

# 📊 Monitoring & Logs

## Render (Backend)

### View Logs:
1. Go to your service
2. Click "Logs" tab
3. See real-time logs

### View Metrics:
1. Click "Metrics" tab
2. See CPU, Memory, Response time

### Database Metrics:
1. Go to PostgreSQL service
2. Click "Metrics"
3. See connections, queries, storage

## Vercel (Frontend)

### View Deployments:
1. Go to project
2. Click "Deployments"
3. See all deployment history

### View Logs:
1. Click on a deployment
2. Click "Functions" or "Build Logs"
3. See execution logs

### Analytics:
1. Click "Analytics" tab
2. See page views, performance

---

# 🔄 Update Deployment

## Update Backend:
```bash
git add backend/
git commit -m "Update backend"
git push origin main
```
Render will auto-deploy in 2-3 minutes.

## Update Frontend:
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
```
Vercel will auto-deploy in 1-2 minutes.

---

# 🌐 Custom Domain (Optional)

## Add Custom Domain to Vercel

1. Go to project → Settings → Domains
2. Add your domain (e.g., `bambooparadise.com`)
3. Follow DNS configuration instructions
4. Vercel provides free SSL

## Add Custom Domain to Render

1. Go to service → Settings → Custom Domain
2. Add your domain (e.g., `api.bambooparadise.com`)
3. Update DNS records
4. Render provides free SSL

## Update Environment Variables

After adding custom domains:

**Vercel:**
```env
NEXT_PUBLIC_API_URL=https://api.bambooparadise.com/api
```

**Render:**
```env
FRONTEND_URL=https://bambooparadise.com
```

---

# 📧 Email Configuration (Optional)

## Using Gmail:

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other"
   - Copy the 16-character password

3. Update Render environment variables:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-hotel-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

## Using SendGrid (Recommended for Production):

1. Sign up at https://sendgrid.com (Free: 100 emails/day)
2. Create API key
3. Update environment variables:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

---

# ✅ Final Deployment Checklist

- [ ] Render account created
- [ ] PostgreSQL database created on Render
- [ ] Backend deployed on Render
- [ ] All backend environment variables set
- [ ] Database migrations run
- [ ] Database seeded (admin/staff created)
- [ ] Backend health check passes
- [ ] Vercel account created
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable set
- [ ] Backend CORS updated with Vercel URL
- [ ] Login tested successfully
- [ ] Booking flow tested
- [ ] Admin dashboard accessible
- [ ] Default passwords changed
- [ ] Email service configured (optional)
- [ ] Custom domain added (optional)

---

# 🎉 Success!

Your Bamboo Paradise Hotel is now live!

**Frontend:** https://bamboo-paradise.vercel.app
**Backend:** https://bamboo-paradise-backend.onrender.com
**Admin Login:** admin@bambooparadise.com / admin123

---

# 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: https://github.com/ashe0123/Bamboo-Paradise-Hotel/issues

---

# 📞 Support Resources

- Check Render logs for backend errors
- Check Vercel logs for frontend errors
- Review browser console for client errors
- Test API endpoints directly
- Verify environment variables

---

**Happy Deploying! 🚀**
