const { Router } = requuire('express');
const router = Router();

const adminController = require('../src/Controllers/admin.controller')

const { verifyIfUserIsLogged } = require('../src/middlewares/admin.middleware')

router.get('/welcome', verifyIfUserIsLogged, adminController.welcome)

module.exports = router;