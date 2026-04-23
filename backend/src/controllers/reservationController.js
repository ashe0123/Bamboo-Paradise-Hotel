const pool = require('../database/db');
const generateReservationNumber = require('../utils/generateReservationNumber');

const createReservation = async (req, res) => {
  try {
    const { room_id, check_in_date, check_out_date, adults, children, special_requests } = req.body;
    const guest_id = req.user.id;

    // Validate dates
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    if (checkIn < today) return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    if (checkOut <= checkIn) return res.status(400).json({ message: 'Check-out must be after check-in' });

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (nights < 1) return res.status(400).json({ message: 'Minimum stay is 1 night' });

    // Check room exists and is available
    const roomResult = await pool.query(
      'SELECT * FROM rooms WHERE id = $1',
      [room_id]
    );
    if (!roomResult.rows[0]) return res.status(404).json({ message: 'Room not found' });

    const room = roomResult.rows[0];
    if (room.status === 'maintenance') {
      return res.status(400).json({ message: 'Room is under maintenance' });
    }

    // Check for overlapping reservations
    const conflict = await pool.query(
      `SELECT id FROM reservations
       WHERE room_id = $1 AND status NOT IN ('cancelled', 'checked_out')
       AND check_in_date < $2 AND check_out_date > $3`,
      [room_id, check_out_date, check_in_date]
    );
    if (conflict.rows.length > 0) {
      return res.status(400).json({ message: 'Room is not available for the selected dates' });
    }

    const total_amount = parseFloat(room.price_per_night) * nights;
    const reservation_number = generateReservationNumber();

    const result = await pool.query(
      `INSERT INTO reservations
         (reservation_number, guest_id, room_id, check_in_date, check_out_date, adults, children, total_amount, special_requests)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [reservation_number, guest_id, room_id, check_in_date, check_out_date,
       parseInt(adults) || 1, parseInt(children) || 0, total_amount, special_requests || null]
    );

    res.status(201).json({ reservation: result.rows[0] });
  } catch (err) {
    console.error('createReservation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, rm.room_number, rc.name as room_category, rm.price_per_night,
              rc.amenities, rm.floor
       FROM reservations r
       JOIN rooms rm ON r.room_id = rm.id
       JOIN room_categories rc ON rm.category_id = rc.id
       WHERE r.guest_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );
    res.json({ reservations: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReservationById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, rm.room_number, rc.name as room_category, rm.price_per_night,
              rc.amenities, rm.floor,
              u.first_name, u.last_name, u.email, u.phone
       FROM reservations r
       JOIN rooms rm ON r.room_id = rm.id
       JOIN room_categories rc ON rm.category_id = rc.id
       JOIN users u ON r.guest_id = u.id
       WHERE r.id = $1`,
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Reservation not found' });

    if (req.user.role === 'guest' && result.rows[0].guest_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get payment info
    const payment = await pool.query(
      'SELECT * FROM payments WHERE reservation_id = $1 ORDER BY created_at DESC LIMIT 1',
      [req.params.id]
    );

    res.json({ reservation: result.rows[0], payment: payment.rows[0] || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const resResult = await pool.query('SELECT * FROM reservations WHERE id = $1', [req.params.id]);
    if (!resResult.rows[0]) return res.status(404).json({ message: 'Reservation not found' });

    const reservation = resResult.rows[0];
    if (req.user.role === 'guest' && reservation.guest_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (['checked_in', 'checked_out', 'cancelled'].includes(reservation.status)) {
      return res.status(400).json({ message: `Cannot cancel a ${reservation.status.replace('_', ' ')} reservation` });
    }

    await pool.query(
      "UPDATE reservations SET status='cancelled', updated_at=NOW() WHERE id=$1",
      [req.params.id]
    );
    await pool.query(
      "UPDATE rooms SET status='available', updated_at=NOW() WHERE id=$1",
      [reservation.room_id]
    );

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const { status, date, search } = req.query;
    let query = `
      SELECT r.*, rm.room_number, rc.name as room_category,
             u.first_name, u.last_name, u.email, u.phone
      FROM reservations r
      JOIN rooms rm ON r.room_id = rm.id
      JOIN room_categories rc ON rm.category_id = rc.id
      JOIN users u ON r.guest_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let idx = 1;

    if (status) { query += ` AND r.status = $${idx++}`; params.push(status); }
    if (date) { query += ` AND r.check_in_date = $${idx++}`; params.push(date); }
    if (search) {
      query += ` AND (u.first_name ILIKE $${idx} OR u.last_name ILIKE $${idx} OR u.email ILIKE $${idx} OR r.reservation_number ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    query += ' ORDER BY r.created_at DESC';

    const result = await pool.query(query, params);
    res.json({ reservations: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const resResult = await pool.query('SELECT * FROM reservations WHERE id = $1', [req.params.id]);
    if (!resResult.rows[0]) return res.status(404).json({ message: 'Reservation not found' });

    const reservation = resResult.rows[0];
    await pool.query(
      'UPDATE reservations SET status=$1, updated_at=NOW() WHERE id=$2',
      [status, req.params.id]
    );

    // Sync room status
    if (status === 'checked_in') {
      await pool.query("UPDATE rooms SET status='occupied', updated_at=NOW() WHERE id=$1", [reservation.room_id]);
    } else if (['checked_out', 'cancelled'].includes(status)) {
      await pool.query("UPDATE rooms SET status='available', updated_at=NOW() WHERE id=$1", [reservation.room_id]);
    } else if (status === 'confirmed') {
      await pool.query("UPDATE rooms SET status='reserved', updated_at=NOW() WHERE id=$1", [reservation.room_id]);
    }

    res.json({ message: `Reservation status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  getReservationById,
  cancelReservation,
  getAllReservations,
  updateReservationStatus,
};
