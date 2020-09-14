const express = require('express');
const router = express.Router();

const meController = require('../controllers/me.controller');

router.get('/list', meController.listFood);
router.get('/trash', meController.listTrashFood);

module.exports = router;
