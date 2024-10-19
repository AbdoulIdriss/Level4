const authService = require('../services/auth.service')

const verifyLoginBody = async ( req , res , next ) => {
    const body = req.body;
    if (!body.email || ! body.password) {
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

const verifyIfUserIsLogged = async( req , res , next ) => {

    const auth = req.header('Authorization');
    if (!auth) {
        return res.status(401).json({
            error : true,
            messsage: 'Access denied. No token provided'
        })
    }

    const verified = await authService.tokenVerify(auth);
    if (!verified) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. Invalid token'
        })
    }

    const user = await authService.verifyUniqness('_id', verified.id)
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. user not found.'
        })
    }
    req.auth =user;
    next();
}

module.exports = { verifyLoginBody , verifyRegisterBody, verifyIfUserIsLogged }