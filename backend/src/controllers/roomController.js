const pool = require('../database/db');

const getAllRooms = async (req, res) => {
  try {
    const { status, category_id, min_price, max_price, check_in, check_out } = req.query;

    let query = `
      SELECT r.*, rc.name as category_name, rc.amenities, rc.max_occupancy, rc.description as category_description
      FROM rooms r
      JOIN room_categories rc ON r.category_id = rc.id
      WHERE 1=1
    `;
    const params = [];
    let idx = 1;

    if (status) { query += ` AND r.status = $${idx++}`; params.push(status); }
    if (category_id) { query += ` AND r.category_id = $${idx++}`; params.push(category_id); }
    if (min_price) { query += ` AND r.price_per_night >= $${idx++}`; params.push(parseFloat(min_price)); }
    if (max_price) { query += ` AND r.price_per_night <= $${idx++}`; params.push(parseFloat(max_price)); }

    if (check_in && check_out) {
      query += ` AND r.id NOT IN (
        SELECT room_id FROM reservations
        WHERE status NOT IN ('cancelled', 'checked_out')
        AND check_in_date < $${idx++} AND check_out_date > $${idx++}
      )`;
      params.push(check_out, check_in);
    }

    query += ' ORDER BY r.floor, r.room_number';

    const result = await pool.query(query, params);
    res.json({ rooms: result.rows });
  } catch (err) {
    console.error('getAllRooms error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, rc.name as category_name, rc.amenities, rc.max_occupancy, rc.description as category_description
       FROM rooms r JOIN room_categories rc ON r.category_id = rc.id
       WHERE r.id = $1`,
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Room not found' });
    res.json({ room: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM room_categories ORDER BY base_price');
    res.json({ categories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createRoom = async (req, res) => {
  try {
    const { room_number, category_id, floor, price_per_night, description } = req.body;
    const result = await pool.query(
      `INSERT INTO rooms (room_number, category_id, floor, price_per_night, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [room_number.trim(), category_id, parseInt(floor), parseFloat(price_per_night), description || null]
    );
    res.status(201).json({ room: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ message: 'Room number already exists' });
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { status, price_per_night, description } = req.body;
    const result = await pool.query(
      `UPDATE rooms SET status=$1, price_per_night=$2, description=$3, updated_at=NOW()
       WHERE id=$4 RETURNING *`,
      [status, parseFloat(price_per_night), description || null, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Room not found' });
    res.json({ room: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, base_price, max_occupancy, amenities } = req.body;
    const result = await pool.query(
      `INSERT INTO room_categories (name, description, base_price, max_occupancy, amenities)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, parseFloat(base_price), parseInt(max_occupancy), JSON.stringify(amenities || [])]
    );
    res.status(201).json({ category: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllRooms, getRoomById, getCategories, createRoom, updateRoom, createCategory };
