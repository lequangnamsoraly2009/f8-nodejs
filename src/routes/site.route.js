const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.controller');

router.get('/search', siteController.search);
router.get('/', siteController.home);
router.get('/food', siteController.home);

module.exports = router;
