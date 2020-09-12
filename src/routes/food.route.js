const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/food.controller');

router.get('/:slug', foodsController.show);

module.exports = router;
