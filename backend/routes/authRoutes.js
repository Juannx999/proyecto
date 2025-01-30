// authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login); 

// Exporta las rutas
module.exports = router;
