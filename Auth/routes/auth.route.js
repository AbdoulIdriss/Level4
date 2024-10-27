const { Router } = require('express');
const router = Router();

const authController = require('../src/Controllers/auth.controller');
const { verifyLoginBody , verifyRegisterBody ,  verifyIfEmailExistBody , verifyResetPasswordBody } = require('../src/middlewares/auth.middleware')

router.post('/login', verifyLoginBody , authController.login);
router.post('/register', verifyRegisterBody , authController.register);
router.post('/verifyemail', authController.enableResetWithEmail , verifyIfEmailExistBody );
router.post('/resetpassword' , verifyResetPasswordBody , authController.resetPass);

module.exports = router;