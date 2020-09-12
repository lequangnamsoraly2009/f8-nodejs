const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/food.controller');

router.get('/create', foodsController.create);
router.post('/store', foodsController.store);
router.get('/:slug', foodsController.show);

module.exports = router;
