const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyUniqness = async( field , value ) => {

    await User.findOne({ [ field ]: value });

}

const hashPassword = async( password ) => {

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
    await user.save()

    return {
        error:false,
        message: 'user registered successfully'
    }
};

const login = async( user , password ) => {

    const compare = await hashCompare(password , user.password)

    if (!compare) {

        return {
            error: true,
            message: 'Invalid email or password'
        }
    }

    const token = jwt.sign({ id : user._id }, 'secret_key', {expiresIn: '1h'} );

    return {

        error: false,
        message: 'Login successful',
        token: token
    }
}

module.exports = { verifyUniqness , register , login , tokenVerify}