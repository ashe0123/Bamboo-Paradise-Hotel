const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { processPayment, getPaymentByReservation, getAllPayments } = require('../controllers/paymentController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/', authenticate,
  [
    body('reservation_id').notEmpty().withMessage('Reservation is required'),
    body('payment_method').notEmpty().withMessage('Payment method is required'),
  ],
  validate,
  processPayment
);
router.get('/reservation/:reservationId', authenticate, getPaymentByReservation);
router.get('/', authenticate, authorize('admin'), getAllPayments);

module.exports = router;
