const pool = require('../database/db');

const getAllServices = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM services WHERE is_available = true ORDER BY category, name'
    );
    res.json({ services: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createService = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const result = await pool.query(
      `INSERT INTO services (name, category, description, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, category, description, parseFloat(price)]
    );
    res.status(201).json({ service: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { name, description, price, is_available } = req.body;
    const result = await pool.query(
      `UPDATE services SET name=$1, description=$2, price=$3, is_available=$4
       WHERE id=$5 RETURNING *`,
      [name, description, parseFloat(price), is_available, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Service not found' });
    res.json({ service: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const requestService = async (req, res) => {
  try {
    const { reservation_id, service_id, quantity, notes } = req.body;

    // Verify reservation belongs to guest and is active (confirmed or checked_in)
    const resResult = await pool.query(
      `SELECT * FROM reservations WHERE id = $1 AND guest_id = $2 AND status IN ('confirmed', 'checked_in')`,
      [reservation_id, req.user.id]
    );
    if (!resResult.rows[0]) {
      return res.status(400).json({ message: 'No active reservation found. You must have a confirmed or checked-in reservation to request services.' });
    }

    // Verify service exists
    const svcResult = await pool.query('SELECT * FROM services WHERE id = $1 AND is_available = true', [service_id]);
    if (!svcResult.rows[0]) return res.status(404).json({ message: 'Service not found or unavailable' });

    const result = await pool.query(
      `INSERT INTO service_requests (reservation_id, service_id, quantity, notes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [reservation_id, service_id, parseInt(quantity) || 1, notes || null]
    );

    res.status(201).json({ serviceRequest: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyServiceRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sr.*, s.name as service_name, s.category, s.price,
              r.reservation_number, rm.room_number
       FROM service_requests sr
       JOIN services s ON sr.service_id = s.id
       JOIN reservations r ON sr.reservation_id = r.id
       JOIN rooms rm ON r.room_id = rm.id
       WHERE r.guest_id = $1
       ORDER BY sr.requested_at DESC`,
      [req.user.id]
    );
    res.json({ serviceRequests: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllServiceRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT sr.*, s.name as service_name, s.category, s.price,
             u.first_name, u.last_name, rm.room_number, r.reservation_number
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      JOIN reservations r ON sr.reservation_id = r.id
      JOIN users u ON r.guest_id = u.id
      JOIN rooms rm ON r.room_id = rm.id
      WHERE 1=1
    `;
    const params = [];
    if (status) { query += ` AND sr.status = $1`; params.push(status); }
    query += ' ORDER BY sr.requested_at DESC';

    const result = await pool.query(query, params);
    res.json({ serviceRequests: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateServiceRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const completedAt = status === 'completed' ? 'NOW()' : 'NULL';
    const result = await pool.query(
      `UPDATE service_requests SET status=$1, completed_at=${completedAt} WHERE id=$2 RETURNING *`,
      [status, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Service request not found' });
    res.json({ serviceRequest: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  requestService,
  getMyServiceRequests,
  getAllServiceRequests,
  updateServiceRequestStatus,
};
