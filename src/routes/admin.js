const express = require('express');
const router = express.Router();
const { getAdmins } = require('../controllers/adminController');

router.get('/', getAdmins);

module.exports = router;