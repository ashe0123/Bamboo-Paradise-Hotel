const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitReview, getPublishedReviews, getAllReviews, togglePublishReview } = require('../controllers/reviewController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', getPublishedReviews);
router.post('/', authenticate,
  [
    body('reservation_id').notEmpty().withMessage('Reservation is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
  ],
  validate,
  submitReview
);
router.get('/all', authenticate, authorize('admin'), getAllReviews);
router.put('/:id/publish', authenticate, authorize('admin'), togglePublishReview);

module.exports = router;
