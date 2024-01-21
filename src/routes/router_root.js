const express = require('express');

const { seed } = require('../controllers/users');

const router = express.Router();

router.post('/seed/config', seed);

module.exports = router;
