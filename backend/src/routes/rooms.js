const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllRooms, getRoomById, getCategories, createRoom, updateRoom, createCategory } = require('../controllers/roomController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', getAllRooms);
router.get('/categories', getCategories);
router.get('/:id', getRoomById);

router.post('/', authenticate, authorize('admin'),
  [
    body('room_number').trim().notEmpty().withMessage('Room number is required'),
    body('category_id').notEmpty().withMessage('Category is required'),
    body('floor').isInt({ min: 1 }).withMessage('Floor must be a positive integer'),
    body('price_per_night').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],
  validate,
  createRoom
);

router.put('/:id', authenticate, authorize('admin', 'staff'), updateRoom);

router.post('/categories', authenticate, authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Category name is required'),
    body('base_price').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
    body('max_occupancy').isInt({ min: 1 }).withMessage('Max occupancy must be at least 1'),
  ],
  validate,
  createCategory
);

module.exports = router;
