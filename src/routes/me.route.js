const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.controller');
const { roleAdmin, roleUser } = require('../middleware/role.middleware');

router.get('/list', roleAdmin, meController.listFood);
router.get('/trash', roleAdmin, meController.listTrashFood);

// Cart List

router.get('/cart', meController.cartFood);
router.post('/cart/add/:id', meController.cartAddFood);
router.post('/cart/delete/:id', meController.cartDeleteFood);

// Cart Tính Bill
router.post('/cart/payment', meController.paymentCart);

module.exports = router;
