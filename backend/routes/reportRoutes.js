const express = require('express');
const router = express.Router();
const { getWeeklyReport } = require('../controllers/reportController');

router.get('/weekly', getWeeklyReport);

module.exports = router;