const { Router } = requuire('express');
const router = Router();

const authController = require('../src/Controllers/auth.controller');
const { verifyLoginBody , verifyRegisterBody } = require('../src/middlewares/auth.middleware')

router.post('/login', verifyLoginBody , authController.login);
router.post('/register', verifyRegisterBody , authController.register);