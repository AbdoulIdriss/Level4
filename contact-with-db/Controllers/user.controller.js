const User = require('../Models/Users');

//getAll

const getAll = async(req , res ) => {
    try {
        const user = await User.find()
        res.json(user)

    } catch (error) {
        res.json({
            eror: true,
            message:'could not retrieve user'
        })
    }
}

//get one user by id

const getOneById = async(req , res ) => {
    
    try {
        
        const id = req.params.id;

        await User.find({_id : id });

        if (User)  {
            res.json(User)
        } else {
            res.status(404).json({message:'contact not found'})
        }

    } catch (error) {
        res.json({
            error: true,
            message: 'error retriving contact'
        })
    }

}

//get create user 

const createOneUser = async(req, res ) => {

    const body = req.body;

    const newUser = new User({
        name: body.name,
        role: body.role,
        plan: body.plan,
        date: body.created_at
    });

    try {
        await newUser.save();
        res.status(201).json({
            eror: false,
            message: 'Contact created successfuly'
        })

    } catch (error) {
        res.status(500).json({
            eror: true,
            message: 'Cant created contact'
        })
    }
}

//update user by Id 

const updateUser = async( req , res ) => {
    try {
        const id = req.params.id;
        const body = req.body 

        await User.findByIdAndUpdate(id, {...body});

        res.json({
            error: false,
            message: 'user updated successfully'
        })

    } catch (error) {
        res.json({
            error: true,
            message: 'user not found'
        })
    }
}

//delete user by id

const deleteUser = async( req, res ) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.json({
            error: false,
            message: ' user deleted succesfully'
        })
    } catch (error) {
        res.json({
            error: true,
            message: ' user not found'
        })
    }
}

module.exports = {getAll , getOneById , createOneUser ,updateUser , deleteUser}