const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.controller');

router.get('/list', meController.listFood);
router.get('/trash', meController.listTrashFood);

// Cart List

router.get('/cart', meController.cartFood);
router.post('/cart/add/:id', meController.cartAddFood);
router.post('/cart/delete/:id', meController.cartDeleteFood);

// Cart Tính Bill
router.get('/cart/read/:id', meController.readCart); // User A thì load cart của User A , User B thì load cart của User B
router.post('/cart/create', meController.createCart);
router.put('/cart/update/:id', meController.updateCart);
router.delete('/cart/delete/:id', meController.deleteCart);

module.exports = router;
