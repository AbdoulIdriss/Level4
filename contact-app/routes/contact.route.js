const { Router } = require('express');
const router = Router()

const contactController = require('../Controllers/contact.controller')
const contactMiddleware = require('../middleware/contact.middleware')

// Get all controllers 
router.get('/', contactController.getAll);

// Get contact by ID 
router.get('/:id', contactController.getOneById);

//sort contact
router.get('/sort', contactMiddleware.sortByQuery ,contactController.sortByQuery);

//create contact
router.post('/create', contactMiddleware.create ,contactController.createOne);

//update contact
router.put('/update/:id', contactController.updateOneById);

//delete
router.delete('/delete/:id', contactController.deleteOneById);

module.exports = router;