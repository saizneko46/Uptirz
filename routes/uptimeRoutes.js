// backend/routes/uptimeRoutes.js
const express = require('express');
const { monitorWebsite } = require('../controllers/uptimeController');

const router = express.Router();

// Endpoint POST untuk monitoring website
router.post('/', monitorWebsite);

module.exports = router;
