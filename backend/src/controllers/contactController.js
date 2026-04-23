const pool = require('../database/db');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), email.toLowerCase().trim(), phone || null, subject || null, message.trim()]
    );
    res.status(201).json({ message: 'Message sent successfully. We will get back to you soon.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    await pool.query('UPDATE contact_messages SET is_read=true WHERE id=$1', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id=$1', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalRooms, availableRooms, occupiedRooms,
      todayCheckIns, todayCheckOuts,
      pendingReservations, confirmedReservations,
      totalGuests, unreadMessages,
      monthlyRevenue, totalRevenue,
      recentReservations
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM rooms'),
      pool.query("SELECT COUNT(*) FROM rooms WHERE status='available'"),
      pool.query("SELECT COUNT(*) FROM rooms WHERE status='occupied'"),
      pool.query("SELECT COUNT(*) FROM reservations WHERE check_in_date=CURRENT_DATE AND status IN ('confirmed','checked_in')"),
      pool.query("SELECT COUNT(*) FROM reservations WHERE check_out_date=CURRENT_DATE AND status='checked_in'"),
      pool.query("SELECT COUNT(*) FROM reservations WHERE status='pending'"),
      pool.query("SELECT COUNT(*) FROM reservations WHERE status='confirmed'"),
      pool.query("SELECT COUNT(*) FROM users WHERE role='guest'"),
      pool.query('SELECT COUNT(*) FROM contact_messages WHERE is_read=false'),
      pool.query(`SELECT COALESCE(SUM(amount), 0) as revenue FROM payments WHERE status='completed' AND DATE_TRUNC('month', paid_at) = DATE_TRUNC('month', NOW())`),
      pool.query(`SELECT COALESCE(SUM(amount), 0) as revenue FROM payments WHERE status='completed'`),
      pool.query(`
        SELECT r.reservation_number, r.status, r.total_amount, r.check_in_date,
               u.first_name, u.last_name, rm.room_number
        FROM reservations r
        JOIN users u ON r.guest_id = u.id
        JOIN rooms rm ON r.room_id = rm.id
        ORDER BY r.created_at DESC LIMIT 5
      `),
    ]);

    // Occupancy rate for last 30 days
    const occupancyData = await pool.query(`
      SELECT COUNT(DISTINCT room_id)::float / NULLIF((SELECT COUNT(*) FROM rooms), 0) * 100 as rate
      FROM reservations
      WHERE status IN ('checked_in', 'checked_out')
      AND check_in_date >= NOW() - INTERVAL '30 days'
    `);

    res.json({
      stats: {
        totalRooms: parseInt(totalRooms.rows[0].count),
        availableRooms: parseInt(availableRooms.rows[0].count),
        occupiedRooms: parseInt(occupiedRooms.rows[0].count),
        todayCheckIns: parseInt(todayCheckIns.rows[0].count),
        todayCheckOuts: parseInt(todayCheckOuts.rows[0].count),
        pendingReservations: parseInt(pendingReservations.rows[0].count),
        confirmedReservations: parseInt(confirmedReservations.rows[0].count),
        totalGuests: parseInt(totalGuests.rows[0].count),
        unreadMessages: parseInt(unreadMessages.rows[0].count),
        monthlyRevenue: parseFloat(monthlyRevenue.rows[0].revenue),
        totalRevenue: parseFloat(totalRevenue.rows[0].revenue),
        occupancyRate: parseFloat(occupancyData.rows[0].rate || 0).toFixed(1),
      },
      recentReservations: recentReservations.rows,
    });
  } catch (err) {
    console.error('getDashboardStats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact, getAllMessages, markAsRead, deleteMessage, getDashboardStats };
