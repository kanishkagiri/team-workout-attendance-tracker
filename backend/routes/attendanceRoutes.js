const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceBySession, getAttendanceSummary } = require('../controllers/attendanceController');

router.post('/', markAttendance);
router.get('/session/:sessionId', getAttendanceBySession);
router.get('/summary/:memberId', getAttendanceSummary);

module.exports = router;