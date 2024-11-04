const authService = require('../services/auth.service');

const login = async( req , res  ) => {

    const verify = await authService.login( req.user , req.body.password );

    if (!verify.error) {

        return res.json(verify)
    }
    return res.status(400).json(verify);
};

const register = async( req , res  ) => {

    const create = await authService.register( req.body );

    res.status(201).json(create);
};

const forgotPassword = async( req , res  ) => {
    const otp = await authService.generateOTP(req.user._id);
    const status = otp.error ? 400 : 200;
    return res.status(status).json(otp)
}

const verifyOTP = async( req , res  ) => {
    return res.status(200).json({
        error: true,
        message: 'OTP is already valid'
    })
}

const resetPassword = async( req , res  ) => {
    const { password , code } = req.body;
    const reset = await authService.resetPassword( password , code );
    const status =  reset.error ? 400 : 200 ;
    return res.status(status).json(reset)
}

module.exports = { login , register , verifyOTP , forgotPassword , resetPassword }