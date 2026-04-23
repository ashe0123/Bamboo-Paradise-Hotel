const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getProfile, updateProfile, changePassword, getAllGuests } = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/register',
  rateLimiter(20, 15 * 60 * 1000),
  [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
);

router.post('/login',
  rateLimiter(10, 15 * 60 * 1000),
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate,
  [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
  ],
  validate,
  updateProfile
);
router.put('/change-password', authenticate,
  [
    body('current_password').notEmpty().withMessage('Current password is required'),
    body('new_password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  validate,
  changePassword
);

router.get('/guests', authenticate, authorize('admin', 'staff'), getAllGuests);

module.exports = router;
