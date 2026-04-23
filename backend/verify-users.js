require('dotenv').config();
const pool = require('./src/database/db');
const bcrypt = require('bcryptjs');

const verifyUsers = async () => {
  try {
    console.log('🔍 Checking users in database...\n');
    
    const result = await pool.query(
      "SELECT id, email, role, is_active, created_at FROM users WHERE email IN ('admin@bambooparadise.com', 'staff@bambooparadise.com') ORDER BY email"
    );
    
    if (result.rows.length === 0) {
      console.log('❌ No admin or staff users found in database!');
      console.log('Run: node fix-users.js to create them\n');
    } else {
      console.log(`✅ Found ${result.rows.length} user(s):\n`);
      result.rows.forEach(user => {
        console.log(`  Email: ${user.email}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Active: ${user.is_active}`);
        console.log(`  Created: ${user.created_at}`);
        console.log('');
      });
      
      // Test password for admin
      console.log('🔐 Testing password hash for admin...');
      const adminResult = await pool.query(
        "SELECT password FROM users WHERE email = 'admin@bambooparadise.com'"
      );
      
      if (adminResult.rows[0]) {
        const isMatch = await bcrypt.compare('admin123', adminResult.rows[0].password);
        console.log(`  Password 'admin123' matches: ${isMatch ? '✅ YES' : '❌ NO'}`);
        
        if (!isMatch) {
          console.log('\n⚠️  Password hash is incorrect!');
          console.log('Run: node fix-users.js to fix the passwords\n');
        } else {
          console.log('\n✅ Passwords are correct!');
          console.log('\nLogin credentials:');
          console.log('  Admin: admin@bambooparadise.com / admin123');
          console.log('  Staff: staff@bambooparadise.com / staff123\n');
        }
      }
    }
    
    pool.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    pool.end();
  }
};

verifyUsers();
