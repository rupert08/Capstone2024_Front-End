const express = require('express');
const router = express.Router();
const { registerCustomer } = require('../controllers/customerController');

router.post('/register', registerCustomer);

module.exports = router;