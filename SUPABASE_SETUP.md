# 🗄️ Supabase Database Configuration

## Your Supabase Database Details

**Connection String:**
```
postgresql://postgres.ppnchdyvcrynciefcwst:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

**Parsed Configuration:**
- **Host:** `aws-0-eu-west-1.pooler.supabase.com`
- **Port:** `6543`
- **Database:** `postgres`
- **User:** `postgres.ppnchdyvcrynciefcwst`
- **Password:** `[YOUR-PASSWORD]` ← Replace with your actual password

---

## ✅ Configuration Updated

Your `backend/.env` file has been updated with Supabase credentials.

**IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual Supabase database password!

---

## 🔧 How to Get Your Supabase Password

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database**
4. Find **Connection String** section
5. Click **"Reset Database Password"** if you don't have it
6. Copy the password and update your `.env` file

---

## 📝 Backend Environment Variables (.env)

Your `backend/.env` should now look like this:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL - Supabase Database
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.ppnchdyvcrynciefcwst
DB_PASSWORD=your_actual_supabase_password_here

# JWT
JWT_SECRET=bamboo_paradise_hotel_jwt_secret_2024_secure_key
JWT_EXPIRES_IN=7d

# Email (nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Next Steps

### 1. Update Your Password
```bash
# Open backend/.env and replace [YOUR-PASSWORD] with your actual password
```

### 2. Run Database Migrations
```bash
cd backend
npm run db:migrate
```

### 3. Seed the Database
```bash
npm run db:seed
```

### 4. Restart Backend Server
```bash
npm start
```

---

## 🌐 For Production Deployment (Render)

When deploying to Render, use these environment variables:

```env
NODE_ENV=production
PORT=5000

# Supabase Database
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.ppnchdyvcrynciefcwst
DB_PASSWORD=your_actual_supabase_password

# JWT - Generate a strong secret for production
JWT_SECRET=generate_a_new_strong_random_secret_for_production
JWT_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-hotel-email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL - Update after deploying to Vercel
FRONTEND_URL=https://bamboo-paradise.vercel.app
```

---

## ✅ Advantages of Using Supabase

- ✅ **Free Tier:** 500 MB database, 2 GB bandwidth
- ✅ **Always Online:** No sleep/wake delays
- ✅ **Automatic Backups:** Daily backups included
- ✅ **Built-in Dashboard:** Easy database management
- ✅ **Fast Connection Pooling:** Better performance
- ✅ **EU Region:** Your database is in Europe (eu-west-1)

---

## 🔒 Security Notes

1. **Never commit** your actual password to GitHub
2. Keep `[YOUR-PASSWORD]` placeholder in `.env.example`
3. Add `.env` to `.gitignore` (already done)
4. Use different passwords for development and production
5. Generate a new JWT_SECRET for production

---

## 🐛 Troubleshooting

### Connection Error: "password authentication failed"
- Double-check your password in `.env`
- Make sure there are no extra spaces
- Try resetting password in Supabase dashboard

### Connection Error: "timeout"
- Check your internet connection
- Verify Supabase project is active
- Check if your IP is allowed (Supabase allows all by default)

### Migration Fails
- Ensure database is empty or drop existing tables
- Check Supabase dashboard for any errors
- Verify connection works: `npm run db:migrate`

---

## 📊 Supabase Dashboard Access

**Manage your database:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Use **Table Editor** to view data
4. Use **SQL Editor** to run queries
5. Check **Database** settings for connection info

---

## 🎉 You're All Set!

Your Bamboo Paradise Hotel now uses **Supabase** as the online database!

**Benefits:**
- Works locally on your computer
- Works when deployed to Render
- No need to switch databases between environments
- Always accessible and fast

---

**Next:** Update your password in `backend/.env` and run migrations!
