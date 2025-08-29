const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { addAvail } = require('../controller/availController');
const router = express.Router();

router.post('/availability', authMiddleware(['user']), addAvail);
module.exports = router;