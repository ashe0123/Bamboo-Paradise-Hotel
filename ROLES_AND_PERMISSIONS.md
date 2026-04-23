# 👥 Roles & Permissions - Bamboo Paradise Hotel

## 🎭 Three User Roles

1. **Guest** - Regular customers who book rooms
2. **Staff** - Hotel employees (reception, housekeeping, etc.)
3. **Admin** - Hotel managers with full system access

---

## 🔐 Detailed Permissions Comparison

### 📊 Dashboard & Statistics

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| View dashboard stats | ❌ | ✅ | ✅ |
| See total rooms | ❌ | ✅ | ✅ |
| See available rooms | ❌ | ✅ | ✅ |
| See today's check-ins | ❌ | ✅ | ✅ |
| See total revenue | ❌ | ✅ | ✅ |

---

### 🏨 Room Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Browse available rooms | ✅ | ✅ | ✅ |
| View room details | ✅ | ✅ | ✅ |
| View room categories | ✅ | ✅ | ✅ |
| **Create new rooms** | ❌ | ❌ | ✅ **ONLY** |
| **Create room categories** | ❌ | ❌ | ✅ **ONLY** |
| **Update room status** | ❌ | ✅ | ✅ |
| Update room details | ❌ | ✅ | ✅ |

**Key Difference:** Only **Admin** can add new rooms and categories. Staff can only update existing rooms.

---

### 📅 Reservation Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Create reservation | ✅ | ✅ | ✅ |
| View own reservations | ✅ | ❌ | ❌ |
| **View ALL reservations** | ❌ | ✅ | ✅ |
| View reservation details | ✅ (own) | ✅ (all) | ✅ (all) |
| Cancel own reservation | ✅ | ❌ | ❌ |
| **Update reservation status** | ❌ | ✅ | ✅ |
| Confirm reservations | ❌ | ✅ | ✅ |
| Check-in guests | ❌ | ✅ | ✅ |
| Check-out guests | ❌ | ✅ | ✅ |
| Cancel any reservation | ❌ | ✅ | ✅ |

**Key Difference:** Guests only see their own bookings. Staff and Admin see all reservations.

---

### 💳 Payment Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Process payment (own) | ✅ | ✅ | ✅ |
| View own payments | ✅ | ❌ | ❌ |
| **View ALL payments** | ❌ | ❌ | ✅ **ONLY** |
| View payment history | ✅ (own) | ❌ | ✅ (all) |

**Key Difference:** Only **Admin** can view all payments and revenue data.

---

### 🛎️ Service Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| View available services | ✅ | ✅ | ✅ |
| Request a service | ✅ | ✅ | ✅ |
| **View all service requests** | ❌ | ✅ | ✅ |
| **Update request status** | ❌ | ✅ | ✅ |
| **Create new services** | ❌ | ❌ | ✅ **ONLY** |
| **Update service details** | ❌ | ❌ | ✅ **ONLY** |
| **Update service pricing** | ❌ | ❌ | ✅ **ONLY** |

**Key Difference:** 
- Staff can process service requests but cannot create/edit services
- Only **Admin** can add new services and change pricing

---

### ⭐ Review Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Submit review (after checkout) | ✅ | ❌ | ❌ |
| View published reviews | ✅ | ✅ | ✅ |
| **View ALL reviews** | ❌ | ❌ | ✅ **ONLY** |
| **Publish/unpublish reviews** | ❌ | ❌ | ✅ **ONLY** |
| Moderate reviews | ❌ | ❌ | ✅ **ONLY** |

**Key Difference:** Only **Admin** can moderate and publish/unpublish reviews.

---

### 📧 Contact & Messages

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Submit contact form | ✅ | ✅ | ✅ |
| **View all messages** | ❌ | ✅ | ✅ |
| **Mark messages as read** | ❌ | ✅ | ✅ |
| **Delete messages** | ❌ | ❌ | ✅ **ONLY** |

**Key Difference:** Only **Admin** can delete messages. Staff can only read and mark as read.

---

### 👤 User Management

| Feature | Guest | Staff | Admin |
|---------|-------|-------|-------|
| Register account | ✅ | ❌ | ❌ |
| Login | ✅ | ✅ | ✅ |
| View own profile | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ |
| Change own password | ✅ | ✅ | ✅ |
| **View all guests** | ❌ | ✅ | ✅ |
| **Create staff accounts** | ❌ | ❌ | ✅ **ONLY** |
| Deactivate users | ❌ | ❌ | ✅ **ONLY** |

**Key Difference:** Only **Admin** can create staff accounts and manage users.

---

## 📊 Summary Table

### What Each Role Can Do

| Category | Guest | Staff | Admin |
|----------|-------|-------|-------|
| **Book Rooms** | ✅ | ✅ | ✅ |
| **Pay for Bookings** | ✅ | ✅ | ✅ |
| **Request Services** | ✅ | ✅ | ✅ |
| **Submit Reviews** | ✅ | ❌ | ❌ |
| **View Dashboard** | ❌ | ✅ | ✅ |
| **Manage Reservations** | Own only | All | All |
| **Check-in/Check-out** | ❌ | ✅ | ✅ |
| **Process Service Requests** | ❌ | ✅ | ✅ |
| **Update Room Status** | ❌ | ✅ | ✅ |
| **View All Payments** | ❌ | ❌ | ✅ |
| **Add/Edit Rooms** | ❌ | ❌ | ✅ |
| **Add/Edit Services** | ❌ | ❌ | ✅ |
| **Moderate Reviews** | ❌ | ❌ | ✅ |
| **Delete Messages** | ❌ | ❌ | ✅ |
| **Create Staff Accounts** | ❌ | ❌ | ✅ |

---

## 🎯 Real-World Use Cases

### 👤 Guest (Customer)
**Typical User:** Hotel customer booking a room

**Can Do:**
- Browse and search for available rooms
- Make online reservations
- Pay for bookings (credit card, debit, bank transfer, cash)
- View their booking history
- Request hotel services (spa, restaurant, laundry, transport)
- Submit reviews after checkout
- Update their profile
- Contact the hotel

**Cannot Do:**
- See other guests' bookings
- Access admin dashboard
- Manage hotel operations
- See financial data

---

### 👔 Staff (Hotel Employee)
**Typical User:** Reception desk, housekeeping supervisor, service coordinator

**Can Do:**
- View dashboard with live statistics
- See all reservations (not just their own)
- Confirm reservations
- Check guests in and out
- Update room status (available, occupied, maintenance)
- View and process service requests
- Mark service requests as completed
- View all contact messages
- View guest list
- Update room details (but not create new rooms)

**Cannot Do:**
- Add new rooms or room categories
- Create or edit services
- Change pricing
- View all payment details
- Moderate reviews
- Delete messages
- Create staff accounts

**Why This Role Exists:** 
Staff need to manage day-to-day operations but shouldn't have access to financial data or system configuration.

---

### 👨‍💼 Admin (Hotel Manager)
**Typical User:** Hotel owner, general manager, system administrator

**Can Do:**
- **Everything Staff can do, PLUS:**
- Add new rooms and room categories
- Create and edit services
- Set and update pricing
- View all payment transactions
- See total revenue
- Moderate and publish/unpublish reviews
- Delete contact messages
- Create staff accounts
- Deactivate users
- Full system configuration

**Why This Role Exists:**
Admin has complete control over the hotel system, including financial data, pricing, and system configuration.

---

## 🔒 Security Implementation

### How It Works:

1. **Authentication** (Who are you?)
   - JWT tokens verify user identity
   - Token expires after 7 days

2. **Authorization** (What can you do?)
   - Middleware checks user role before allowing access
   - Routes protected with `authorize('admin')` or `authorize('admin', 'staff')`

3. **Data Access Control**
   - Guests can only see their own data
   - Staff can see operational data
   - Admin can see everything

### Code Example:
```javascript
// Only Admin can create rooms
router.post('/', authenticate, authorize('admin'), createRoom);

// Both Admin and Staff can update room status
router.put('/:id', authenticate, authorize('admin', 'staff'), updateRoom);

// Anyone authenticated can create a reservation
router.post('/', authenticate, createReservation);
```

---

## 🎓 Training Guide

### For Reception Staff:
1. Login with staff credentials
2. View today's check-ins on dashboard
3. Update reservation status to "checked_in"
4. Process service requests
5. Read and respond to contact messages

### For Hotel Managers (Admin):
1. Login with admin credentials
2. Monitor dashboard statistics
3. Add new rooms when needed
4. Update pricing and services
5. Review and moderate guest reviews
6. View financial reports
7. Create staff accounts for new employees

---

## 📝 Quick Reference

### Login Credentials:

```
Admin:
  Email: admin@bambooparadise.com
  Password: admin123
  Access: Full system control

Staff:
  Email: staff@bambooparadise.com
  Password: staff123
  Access: Operations management

Guest:
  Register your own account
  Access: Personal bookings only
```

---

## 🔑 Key Differences Summary

| What | Staff | Admin |
|------|-------|-------|
| **Primary Role** | Day-to-day operations | System management & strategy |
| **Can Add Rooms?** | ❌ No | ✅ Yes |
| **Can Set Prices?** | ❌ No | ✅ Yes |
| **View Payments?** | ❌ No | ✅ Yes |
| **Moderate Reviews?** | ❌ No | ✅ Yes |
| **Create Staff Accounts?** | ❌ No | ✅ Yes |
| **Manage Reservations?** | ✅ Yes | ✅ Yes |
| **Check-in/Check-out?** | ✅ Yes | ✅ Yes |
| **Process Services?** | ✅ Yes | ✅ Yes |

**Bottom Line:** 
- **Staff** = Operations (handle guests, manage bookings)
- **Admin** = Management (configure system, view finances, set strategy)
