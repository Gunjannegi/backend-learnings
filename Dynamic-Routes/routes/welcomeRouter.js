const express = require('express');
const router = express.Router();
const welcomeController= require('../controllers/welcomeController');

router.get('/:username',welcomeController);

module.exports = router;