const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

const processPayment = async (req, res) => {
  try {
    const { reservation_id, payment_method } = req.body;

    const resResult = await pool.query(
      'SELECT * FROM reservations WHERE id=$1 AND guest_id=$2',
      [reservation_id, req.user.id]
    );
    if (!resResult.rows[0]) return res.status(404).json({ message: 'Reservation not found' });

    const reservation = resResult.rows[0];
    if (!['pending', 'confirmed'].includes(reservation.status)) {
      return res.status(400).json({ message: `Cannot process payment for a ${reservation.status.replace('_', ' ')} reservation` });
    }

    // Check if already paid
    const existingPayment = await pool.query(
      "SELECT id FROM payments WHERE reservation_id=$1 AND status='completed'",
      [reservation_id]
    );
    if (existingPayment.rows.length > 0) {
      return res.status(400).json({ message: 'This reservation has already been paid' });
    }

    const transaction_id = `TXN-${uuidv4().slice(0, 8).toUpperCase()}`;

    const result = await pool.query(
      `INSERT INTO payments (reservation_id, amount, payment_method, status, transaction_id, paid_at)
       VALUES ($1, $2, $3, 'completed', $4, NOW()) RETURNING *`,
      [reservation_id, reservation.total_amount, payment_method, transaction_id]
    );

    // Confirm reservation after payment
    await pool.query(
      "UPDATE reservations SET status='confirmed', updated_at=NOW() WHERE id=$1",
      [reservation_id]
    );
    // Mark room as reserved
    await pool.query(
      "UPDATE rooms SET status='reserved', updated_at=NOW() WHERE id=$1",
      [reservation.room_id]
    );

    res.status(201).json({
      payment: result.rows[0],
      message: 'Payment successful! Your reservation is confirmed.',
    });
  } catch (err) {
    console.error('processPayment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPaymentByReservation = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.* FROM payments p
       JOIN reservations r ON p.reservation_id = r.id
       WHERE p.reservation_id=$1 AND (r.guest_id=$2 OR $3 IN ('admin','staff'))`,
      [req.params.reservationId, req.user.id, req.user.role]
    );
    res.json({ payments: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, r.reservation_number, u.first_name, u.last_name, u.email
       FROM payments p
       JOIN reservations r ON p.reservation_id = r.id
       JOIN users u ON r.guest_id = u.id
       ORDER BY p.created_at DESC`
    );
    res.json({ payments: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { processPayment, getPaymentByReservation, getAllPayments };
