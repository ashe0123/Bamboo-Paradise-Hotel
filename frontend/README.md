# 🏨 Bamboo Paradise Hotel - Frontend

Modern hotel booking interface built with Next.js 14 and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Date Picker:** React DatePicker
- **State Management:** React Context API
- **Cookies:** js-cookie

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## 🏃 Run Development Server

```bash
npm run dev
```

Open **http://localhost:3000**

## 🎨 Features

### For Guests
- 🏠 Homepage with hotel overview
- 🏨 Room browsing and filtering
- 📅 Booking system with date picker
- 💳 Payment processing (4 methods)
- 👤 User dashboard
- 📝 Reservation management
- ⭐ Review submission
- 📧 Contact form

### For Staff
- 📊 Dashboard with statistics
- 🏨 Manage all reservations
- ✅ Check-in/check-out guests
- 🛎️ Process service requests
- 📨 View contact messages

### For Admin
- Everything staff can do, plus:
- 🏨 Add/edit rooms
- 💰 View all payments
- ⭐ Moderate reviews
- 👥 Manage users
- 🔧 Full system control

## 📱 Pages

- `/` - Homepage
- `/rooms` - Room listing
- `/rooms/[id]` - Room details
- `/login` - Login page
- `/register` - Registration
- `/dashboard` - User dashboard
- `/dashboard/reservations/[id]` - Reservation details
- `/dashboard/reviews` - My reviews
- `/dashboard/profile` - Profile settings
- `/admin` - Admin dashboard
- `/admin/reservations` - Manage reservations
- `/admin/rooms` - Manage rooms
- `/admin/services` - Manage services
- `/admin/reviews` - Moderate reviews
- `/admin/messages` - Contact messages
- `/contact` - Contact page
- `/about` - About page
- `/faq` - FAQ page
- `/gallery` - Gallery page
- `/services` - Services page

## 🎨 Components

- `Navbar` - Navigation with auth state
- `Footer` - Site footer
- `RoomCard` - Room display card
- `StatusBadge` - Reservation status badge
- `LoadingSpinner` - Loading indicator

## 🔐 Authentication

- JWT token stored in cookies
- Automatic token refresh
- Protected routes
- Role-based access control

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

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📊 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js pages (App Router)
│   │   ├── page.js          # Homepage
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration
│   │   ├── rooms/           # Room pages
│   │   ├── dashboard/       # User dashboard
│   │   └── admin/           # Admin panel
│   ├── components/          # React components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── RoomCard.js
│   │   └── ...
│   ├── context/             # React context
│   │   └── AuthContext.js
│   └── lib/                 # Utilities
│       ├── api.js           # API client
│       └── images.js        # Image helpers
├── public/                  # Static files
├── .env.local               # Environment variables
└── package.json
```

## 🎨 Styling

Using Tailwind CSS with custom configuration:

- Responsive design (mobile-first)
- Custom color palette
- Smooth animations
- Modern UI components

## 📚 Documentation

See main repository for complete documentation:
https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 🔗 Related Repositories

- **Backend API:** https://github.com/ashe0123/Bamboo-Paradise-Backend
- **Main Repo (Documentation):** https://github.com/ashe0123/Bamboo-Paradise-Hotel

## 🧪 Testing

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Login with: admin@bambooparadise.com / admin123
```

## 📄 License

Open source - Free to use for learning and commercial purposes.
