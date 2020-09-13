const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/food.controller');

router.get('/create', foodsController.create);
router.get('/:slug', foodsController.find);
router.post('/', foodsController.createFood);
router.get('/', foodsController.all);

module.exports = router;
