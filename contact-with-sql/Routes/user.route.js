const { Router } = require('express');
const router = Router();

const userController = require('../Controllers/user.controller')

//GET ALL USERS 

router.get('/' , userController.getAllUsers);

//Create one user 

router.post('/create', userController.createUser);

//update one user 

router.put('/update/:id', userController.updateUser);

//delete one user 

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;