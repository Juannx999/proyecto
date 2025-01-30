const express = require('express');
const { createEvento, getEventos, updateEvento, deleteEvento } = require('../controllers/eventoController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/eventos', authenticateToken, createEvento);
router.get('/eventos', getEventos);
router.put('/eventos/:id', authenticateToken, updateEvento);
router.delete('/eventos/:id', authenticateToken, deleteEvento);

module.exports = router;
