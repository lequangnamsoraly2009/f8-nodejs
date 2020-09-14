const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/food.controller');

router.get('/create', foodsController.create);
router.get('/:slug', foodsController.find);
router.get('/edit/:id', foodsController.editFood);
router.post('/', foodsController.createFood);
router.put('/:id', foodsController.updateFood);
router.patch('/restore/:id', foodsController.restoreFood);
router.delete('/:id', foodsController.deleteFood);
router.delete('/force/:id', foodsController.forceDeleteFood);
router.get('/', foodsController.all);

module.exports = router;
