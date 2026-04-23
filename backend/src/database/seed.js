require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcryptjs');

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await client.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, role)
      VALUES ('Admin', 'Manager', 'admin@bambooparadise.com', $1, '+1234567890', 'admin')
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);

    // Staff user
    const staffPassword = await bcrypt.hash('staff123', 12);
    await client.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, role)
      VALUES ('John', 'Staff', 'staff@bambooparadise.com', $1, '+1234567891', 'staff')
      ON CONFLICT (email) DO NOTHING;
    `, [staffPassword]);

    // Room categories
    const categories = await client.query(`
      INSERT INTO room_categories (name, description, base_price, max_occupancy, amenities)
      VALUES
        ('Standard Room', 'Comfortable room with essential amenities', 89.00, 2, '["WiFi", "TV", "Air Conditioning", "Private Bathroom"]'),
        ('Deluxe Room', 'Spacious room with premium furnishings and garden view', 149.00, 2, '["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Garden View", "Bathtub"]'),
        ('Junior Suite', 'Elegant suite with separate living area', 229.00, 3, '["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Living Area", "Balcony", "Bathtub"]'),
        ('Bamboo Suite', 'Luxurious suite with bamboo-themed decor and panoramic views', 349.00, 4, '["WiFi", "Smart TV", "Air Conditioning", "Full Bar", "Living Room", "Private Balcony", "Jacuzzi", "Butler Service"]'),
        ('Family Room', 'Large room designed for families with kids amenities', 199.00, 5, '["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Bunk Beds", "Kids Corner"]')
      ON CONFLICT DO NOTHING
      RETURNING id, name;
    `);

    // Rooms
    if (categories.rows.length > 0) {
      const catMap = {};
      categories.rows.forEach(c => { catMap[c.name] = c.id; });

      const rooms = [
        { number: '101', category: 'Standard Room', floor: 1, price: 89.00 },
        { number: '102', category: 'Standard Room', floor: 1, price: 89.00 },
        { number: '103', category: 'Standard Room', floor: 1, price: 89.00 },
        { number: '201', category: 'Deluxe Room', floor: 2, price: 149.00 },
        { number: '202', category: 'Deluxe Room', floor: 2, price: 149.00 },
        { number: '203', category: 'Deluxe Room', floor: 2, price: 149.00 },
        { number: '301', category: 'Junior Suite', floor: 3, price: 229.00 },
        { number: '302', category: 'Junior Suite', floor: 3, price: 229.00 },
        { number: '401', category: 'Bamboo Suite', floor: 4, price: 349.00 },
        { number: '402', category: 'Bamboo Suite', floor: 4, price: 349.00 },
        { number: '501', category: 'Family Room', floor: 5, price: 199.00 },
        { number: '502', category: 'Family Room', floor: 5, price: 199.00 },
      ];

      for (const room of rooms) {
        if (catMap[room.category]) {
          await client.query(`
            INSERT INTO rooms (room_number, category_id, floor, price_per_night)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (room_number) DO NOTHING;
          `, [room.number, catMap[room.category], room.floor, room.price]);
        }
      }
    }

    // Services
    await client.query(`
      INSERT INTO services (name, category, description, price)
      VALUES
        ('Breakfast Buffet', 'restaurant', 'Full breakfast buffet served 6:30 AM - 10:30 AM', 18.00),
        ('Room Service', 'restaurant', '24/7 in-room dining from our full menu', 5.00),
        ('Bamboo Spa Treatment', 'spa', '60-minute full body massage with bamboo oil', 85.00),
        ('Facial Treatment', 'spa', 'Rejuvenating facial using natural bamboo extracts', 65.00),
        ('Laundry Service', 'laundry', 'Same-day laundry and dry cleaning service', 15.00),
        ('Airport Transfer', 'transport', 'Private car transfer to/from airport', 45.00),
        ('City Tour', 'transport', 'Half-day guided city tour with hotel vehicle', 60.00),
        ('Daily Housekeeping', 'housekeeping', 'Extra housekeeping service on demand', 0.00),
        ('Turndown Service', 'housekeeping', 'Evening turndown service with chocolates', 10.00)
      ON CONFLICT DO NOTHING;
    `);

    await client.query('COMMIT');
    console.log('✅ Database seeded successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err);
    throw err;
  } finally {
    client.release();
    pool.end();
  }
};

seed();
