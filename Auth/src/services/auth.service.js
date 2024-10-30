const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyUniqness = async ( field , value ) => {

    return await User.findOne({ [ field ]: value });
}


const hashPassword = async( password ) => {
    //the salt is used for extra security . For the password + the salt to be hashed together to create a more strong password 
    try {

        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash( password , salt );

    } catch (error) {

        throw new Error('Invalid password: ' + error.message );

    }
}

const tokenVerify = ( token ) => {

    try {

        return jwt.verify(token , 'secret_key');

    } catch (error) {

        return false 
    }
}

const hashCompare = async(value, hash ) => {

    try {

        return await bcrypt.compare( value , hash );

    } catch (error) {
        
        return false; 

    }
}

const register = async( data ) => {

    const password = await hashPassword( data.password );
    data.password = password;

    const user = new User(data);
    await user.save();

    return {
        error:false,
        message: 'user registered successfully.'
    }
};

const login = async( user , password ) => {

    console.log(user, password );
    
    const compare = await hashCompare(password , user.password)
    console.log(compare);
    
    if (!compare) {

        return {
            error: true,
            message: 'Invalid email or password.'
        }
    }

    const token = jwt.sign({ id : user._id }, 'secret_key', {expiresIn: '1h'} );

    return {

        error: false,
        message: 'Login successful.',
        token: token
    }
};



const resetPassword = async( email , newPassword ) => {

    // const password = await hashPassword( data.password );
    // data.password = password;

    // const user = new User(data.password);
    // await user.password.save()

    // return {
    //     error:false,
    //     message: 'Password modified successfully.'
    // }

    const hashedPassword = await hashPassword( newPassword );
    
    await User.findByIdAndUpdate(email , { password: hashedPassword })

    console.log(hashedPassword);

    return {
        error:false,
        message: 'Password modified successfully.'
    }
}


module.exports = { verifyUniqness , register , login , tokenVerify , resetPassword , hashPassword };