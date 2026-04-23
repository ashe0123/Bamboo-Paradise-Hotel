const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllServices, createService, updateService,
  requestService, getMyServiceRequests,
  getAllServiceRequests, updateServiceRequestStatus,
} = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Public
router.get('/', getAllServices);

// Guest
router.post('/request', authenticate,
  [
    body('reservation_id').notEmpty().withMessage('Reservation is required'),
    body('service_id').notEmpty().withMessage('Service is required'),
  ],
  validate,
  requestService
);
router.get('/my-requests', authenticate, getMyServiceRequests);

// Admin / Staff — must come before /:id routes
router.get('/requests', authenticate, authorize('admin', 'staff'), getAllServiceRequests);
router.put('/requests/:id', authenticate, authorize('admin', 'staff'),
  [body('status').notEmpty().withMessage('Status is required')],
  validate,
  updateServiceRequestStatus
);

// Admin only
router.post('/', authenticate, authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Service name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  ],
  validate,
  createService
);
router.put('/:id', authenticate, authorize('admin'), updateService);

module.exports = router;
