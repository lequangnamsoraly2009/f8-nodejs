const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.controller');

router.get('/list', meController.listFood);
router.get('/trash', meController.listTrashFood);
router.get('/cart', meController.cartFood);
router.post('/cart/add/:id', meController.cartAddFood);
router.post('/cart/delete/:id', meController.cartDeleteFood);

module.exports = router;
