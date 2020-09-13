const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.controller');

router.get('/list', meController.listFood);

module.exports = router;
