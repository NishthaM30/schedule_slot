const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { getAvailability } = require('../controller/adminController');
const router = express.Router();

router.get('/slots/:date', authMiddleware(['admin']), getAvailability);
module.exports = router;