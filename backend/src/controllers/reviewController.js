const pool = require('../database/db');

const submitReview = async (req, res) => {
  try {
    const { reservation_id, rating, comment } = req.body;

    const resResult = await pool.query(
      "SELECT * FROM reservations WHERE id=$1 AND guest_id=$2 AND status='checked_out'",
      [reservation_id, req.user.id]
    );
    if (!resResult.rows[0]) {
      return res.status(400).json({ message: 'You can only review completed stays' });
    }

    const existing = await pool.query(
      'SELECT id FROM reviews WHERE reservation_id=$1', [reservation_id]
    );
    if (existing.rows[0]) {
      return res.status(400).json({ message: 'Review already submitted for this stay' });
    }

    const result = await pool.query(
      `INSERT INTO reviews (reservation_id, guest_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [reservation_id, req.user.id, rating, comment]
    );
    res.status(201).json({ review: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPublishedReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT rv.rating, rv.comment, rv.created_at,
              u.first_name, u.last_name, rc.name as room_category
       FROM reviews rv
       JOIN users u ON rv.guest_id = u.id
       JOIN reservations r ON rv.reservation_id = r.id
       JOIN rooms rm ON r.room_id = rm.id
       JOIN room_categories rc ON rm.category_id = rc.id
       WHERE rv.is_published = true
       ORDER BY rv.created_at DESC`
    );
    res.json({ reviews: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT rv.*, u.first_name, u.last_name, u.email
       FROM reviews rv JOIN users u ON rv.guest_id = u.id
       ORDER BY rv.created_at DESC`
    );
    res.json({ reviews: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const togglePublishReview = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE reviews SET is_published = NOT is_published WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Review not found' });
    res.json({ review: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitReview, getPublishedReviews, getAllReviews, togglePublishReview };
