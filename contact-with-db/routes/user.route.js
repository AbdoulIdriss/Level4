const { Router } = require('express');
const router = Router()

const userController = require('../Controllers/user.controller')

// Get all controllers 
router.get('/', userController.getAll);

// Get user by ID 
router.get('/:id', userController.getOneById);


//create user
router.post('/create' ,userController.createOneUser);

//update user
router.put('/update/:id', userController.updateUser);

//delete
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;