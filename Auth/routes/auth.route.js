const { Router } = require('express');
const router = Router();

const authController = require('../src/Controllers/auth.controller');
const { verifyLoginBody , verifyRegisterBody ,  verifyIfEmailExistBody , verifyResetPasswordBody , verifyOTP } = require('../src/middlewares/auth.middleware')

router.post('/login', verifyLoginBody , authController.login);
router.post('/register', verifyRegisterBody , authController.register);

router.post('/forgot-password', verifyIfEmailExistBody, authController.forgotPassword)
router.post('/verify-otp', verifyOTP, authController.verifyOTP)
router.post('/reset-password', verifyResetPasswordBody , authController.resetPassword);

module.exports = router;