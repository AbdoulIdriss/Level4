const authService = require('../services/auth.service')

const verifyLoginBody = async ( req , res , next ) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(404).json({
            error: true,
            message: 'Body must contain email and password'
        })
    }

    const user = await authService.verifyUniqness('email', body.email);
    if (!user) {
        return res.status(404).json({
            error:true,
            message: 'invalid email or password'
        })
    }

    req.user = user;
    next();
};

const verifyRegisterBody = async( req , res , next ) => {

    const body = req.body;

    if (!body.first_name || !body.last_name ||
        !body.email || !body.username || 
        !body.password || !body.confirm_password
    ) {
        return res.status(404).json({
            error: true,
            message: 'Body must contain first_name, last_name, username, email, password and confirm_password'
        })
    }

    if ( body.password !== body.confirm_password ) {
        return res.status(404).json({
            error: true,
            message: 'Passwords dont match.'
        })
    }

    const emailIsUnique = await authService.verifyUniqness('email', body.email);
    console.log(emailIsUnique);
    if (emailIsUnique) {
        return res.status(404).json({
            error: true,
            message: 'email already exist'
        })
    }

    const usernameIsUniqe = await authService.verifyUniqness('username', body.username)
    if (usernameIsUniqe) {
        return res.status(404).json({
            error: true,
            message: 'username already exist'
        })
    }

    next();
};

//create function to verify if email exist before being redirected to the forget password page
const verifyIfEmailExistBody = async( req , res , next ) => {

    const email = req.body.email;

    if (!email) {
        return res.status(404).json({
            error: true,
            message: 'Please enter email'
        })
    }

    const user = await authService.verifyUniqness('email', email);
    console.log(user);

    if (user) {
        req.user = user;
        next();
    } else{
        return res.json({
            error: true,
            message: 'email not found'
        })
    }

};
//end here

//verify OTP
//here we verify the email and the code entered by the user
const verifyOTP = async( req , res , next ) => {
    const { email , code } = req.body;
    const verify = await authService.verifyOTP( email, code );
    if (!verify) {
        return res.status(400).json({
            error: true,
            message: 'Invalid OTP'
        })
    }
    next()
}
//end here

//create verify reset password body

const verifyResetPasswordBody = async( req , res , next ) => {

    const { password , confirm_password , code } = req.body;

    if (!code) {
        return res.status(400).json({
            error: true,
            message: 'Please enter code'
        })
    }

    if ( password !== confirm_password ) {
        return res.status(400).json({
            error: true,
            message: "Passwords don't match."
        })
    }

    next();
}

//end

const verifyIfUserIsLogged = async (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. No token provided.'
        });
    }

    const verified = authService.tokenVerify(auth);
    if (!verified) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. Invalid token.'
        });
    }

    const user = await authService.verifyIfIsUnique('_id', verified.id);
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. User not found.'
        });
    }

    req.auth = user;
    next();
};

module.exports = { verifyLoginBody , verifyRegisterBody, verifyIfUserIsLogged , verifyIfEmailExistBody , verifyResetPasswordBody , verifyOTP }