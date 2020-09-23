const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/sign-in', authController.signIn);
router.get('/sign-up', authController.signUp);

router.post('/sign-up', authController.postSignUp);
router.post('/sign-in', authController.postSignIn);
module.exports = router;
