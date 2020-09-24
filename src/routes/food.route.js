const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/food.controller');
const { roleAdmin, roleUser } = require('../middleware/role.middleware');

router.get('/create', roleAdmin, foodsController.create);
router.get('/:slug', foodsController.find);
router.get('/edit/:id', roleAdmin, foodsController.editFood);
router.post('/', roleAdmin, foodsController.createFood);
router.put('/:id', roleAdmin, foodsController.updateFood);
router.patch('/restore/:id', roleAdmin, foodsController.restoreFood);
router.delete('/:id', roleAdmin, foodsController.deleteFood);
router.delete('/force/:id', roleAdmin, foodsController.forceDeleteFood);
router.get('/', foodsController.all);

module.exports = router;
