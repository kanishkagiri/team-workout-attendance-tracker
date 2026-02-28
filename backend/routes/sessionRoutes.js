const express = require('express');
const router = express.Router();
const { createSession, getSessions, updateSession, deleteSession } = require('../controllers/sessionController');

router.post('/', createSession);
router.get('/', getSessions);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

module.exports = router;