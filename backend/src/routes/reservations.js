const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createReservation, getMyReservations, getReservationById,
  cancelReservation, getAllReservations, updateReservationStatus,
} = require('../controllers/reservationController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Guest routes
router.post('/', authenticate,
  [
    body('room_id').notEmpty().withMessage('Room is required'),
    body('check_in_date').isDate().withMessage('Valid check-in date is required'),
    body('check_out_date').isDate().withMessage('Valid check-out date is required'),
    body('adults').optional().isInt({ min: 1 }).withMessage('Adults must be at least 1'),
  ],
  validate,
  createReservation
);
router.get('/my', authenticate, getMyReservations);
router.get('/:id', authenticate, getReservationById);
router.put('/:id/cancel', authenticate, cancelReservation);

// Admin / Staff
router.get('/', authenticate, authorize('admin', 'staff'), getAllReservations);
router.put('/:id/status', authenticate, authorize('admin', 'staff'),
  [body('status').notEmpty().withMessage('Status is required')],
  validate,
  updateReservationStatus
);

module.exports = router;
