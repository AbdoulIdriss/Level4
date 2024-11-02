const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserOTP = require('../Models/UserOTP');

const random = (length) => {
    const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

const generateExpired = (minutes) => {
    return new Date(new Date().getTime() + ( 60 * 1000 * minutes));
}

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

const generateOTP = async(id_user) => {
    try {
        const otp = {
            code: random(5),
            expired_at: generateExpired(10),
            user_id: id_user,
        }
        await UserOTP.create(otp);
        console.log("backend otp",otp)
        return {
            error: false,
            data: otp
        }
    }catch(error){
        console.log(error);
        return {
            error: true,
            message: "Failed to create OTP"
        }
    }
}

const verifyOTP = async( email , code) => {
    const userOTP = await UserOPT.findOne({ code: code , expired_at: { $gt : new Date() } }) //$gt is greater than . here we compare current date and the date we recieved the otp
                                 .populate({ path: 'id_user', select : { email : 1 }}) //populate used to get informations from the parent ( used when using the reference method in the schema)
    return !!(userOTP && userOTP.id_user.email === email ); // the !! is to precise that if there's something, it returns true and if there's not, it returns false
}

const resetPassword = async( password , code  ) => {
    try {
        const userOTP = await UserOTP.findOne({code: code});
        if (!userOTP) {
            return {
                error: true,
                message: 'Invalid OTP'
            }
        }
        const user = await User.findById(userOTP.id_user);
        if(!user) {
            return {
                error: true,
                message: 'user not found'
            }
        }
        user.password = hashPassword(password);
        await user.save();
        await userOTP.deleteOne({_id:userOTP._id});

        return {
            error: false,
            message: 'password reset successfully.',
            data: {
                email: user.email
            }
        }
    }catch(error){
        console.log(error);
        return {
            error: true,
            message: "Failed to reset password"
        }
    }
}


module.exports = { verifyUniqness , register , login , tokenVerify , resetPassword , hashPassword , generateOTP , verifyOTP};