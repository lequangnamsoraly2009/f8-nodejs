const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

const siteController = require('../controllers/site.controller');

router.get('/', verifyToken, siteController.home);

module.exports = router;
