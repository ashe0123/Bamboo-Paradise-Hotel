const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getAllMessages, markAsRead, deleteMessage, getDashboardStats } = require('../controllers/contactController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  submitContact
);

router.get('/dashboard/stats', authenticate, authorize('admin', 'staff'), getDashboardStats);
router.get('/messages', authenticate, authorize('admin', 'staff'), getAllMessages);
router.put('/messages/:id/read', authenticate, authorize('admin', 'staff'), markAsRead);
router.delete('/messages/:id', authenticate, authorize('admin'), deleteMessage);

module.exports = router;
