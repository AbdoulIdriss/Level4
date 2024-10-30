const { Router } = require('express');
const router = Router();

const authController = require('../src/Controllers/auth.controller');
const { verifyLoginBody , verifyRegisterBody ,  verifyIfEmailExistBody , verifyResetPasswordBody } = require('../src/middlewares/auth.middleware')

router.post('/login', verifyLoginBody , authController.login);
router.post('/register', verifyRegisterBody , authController.register);
router.post('/verifyemail', verifyIfEmailExistBody , authController.requestPasswordReset , authController.validateResetCode);
router.post('/validate-reset-code', authController.validateResetCode);
router.post('/resetpassword' , verifyResetPasswordBody , authController.resetPassword);

module.exports = router;