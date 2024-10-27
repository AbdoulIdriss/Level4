const User = require('../Models/Users');

//Show all users 
const getAllUsers = async ( req, res ) => {

    try {
        const users = await User.findAll();
        res.render('index', {users})
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Create new user 

const createUser = async( req , res ) => {

    try {
        const { name , email , password } = req.body;
        await User.create({ name , email , password });
        res.status(201).json({
            error: false,
            message:'user created succesfully'
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message:'Error creating user'
        })
    }
}

const  updateUser = async( req , res ) => {
    
    try {
        const id = req.params.id;
        const { name , email , password } = req.body;
        await User.update({ name , email , password } , { where: { id } });
        res.status().json({
            error: false,
            message:'user updated succesfully'
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error updating user'
        })
    }
}

const deleteUser = async( req , res ) => {
    
    try {
        const id = req.params.id;
        await User.destroy( { where: { id }});
        res.status(200).json({
            error: false,
            message: 'user deleted succesfully'
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'error deleting user'
        })
    }
};

module.exports = { getAllUsers , createUser ,  updateUser , deleteUser }