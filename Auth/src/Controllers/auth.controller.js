const authService = require('../services/auth.service');
const User = require('../Models/User');
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
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


const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found for the provided email'
            });
        }

        const resetCode = crypto.randomBytes(3).toString('hex');

        user.passwordResetCode = resetCode;
        user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // Expires in 15 minutes
        await user.save();

        res.status(200).json({
            error: false,
            message: 'Reset code generated successfully',
            resetCode: resetCode  // Ensure the code is sent here
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error generating password reset code'
        });
    }
};


// const resetPassword = async (req, res) => {
//     try {
//         const { email, newPassword, resetCode } = req.body;

//         const user = await User.findOne({ email });
//         if (!user || user.passwordResetCode !== resetCode || user.passwordResetExpires < Date.now()) {
//             return res.status(400).json({
//                 error: true,
//                 message: 'Invalid or expired reset code'
//             });
//         }

//         const hashedPassword = await hashPassword(newPassword);
//         user.password = hashedPassword;
//         user.passwordResetCode = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save();

//         res.status(200).json({
//             error: false,
//             message: 'Password reset successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: true,
//             message: 'Error resetting password'
//         });
//     }
// };

const resetPassword = async (req, res) => {
    try {
        const password  = req.body.password; 
        // passwordResetCode = User.passwordResetCode;
        const resetCode = req.body.resetCode
        const user = await User.findOne({ passwordResetCode: resetCode });
        
        if (!user || user.passwordResetExpires < Date.now()) {
            return res.status(400).json({
                error: true,
                message: 'Invalid or expired reset code'
            });
        }

        const hashedPassword = await authService.hashPassword(password);
        user.password = hashedPassword;
        user.passwordResetCode = undefined; // Clear reset code
        user.passwordResetExpires = undefined; // Clear expiration time

        const save = await user.save();
        console.log('Save: ', save);

        res.status(200).json({
            error: false,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            error: true,
            message: 'Error resetting password'
        });
    }
};



// const resetPassword = async (req, res) => {
//     try {
//         const { newPassword } = req.body;
//         const resetCode = req.headers['reset-code']; // Or get it from another source

//         // Assuming the user's email is stored in session storage or JWT token
//         const email = req.user.email; // Example, adjust according to your auth method

//         const user = await User.findOne({ email });
//         if (!user || user.passwordResetCode !== resetCode || user.passwordResetExpires < Date.now()) {
//             return res.status(400).json({
//                 error: true,
//                 message: 'Invalid or expired reset code'
//             });
//         }

//         const hashedPassword = await hashPassword(newPassword);
//         user.password = hashedPassword;
//         user.passwordResetCode = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save();

//         res.status(200).json({
//             error: false,
//             message: 'Password reset successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: true,
//             message: 'Error resetting password'
//         });
//     }
// };




// const validateResetCode = async (req, res) => {
//     try {
//         const { email, resetCode } = req.body;

//         console.log(email);
        
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user || user.passwordResetCode !== resetCode || user.passwordResetExpires < Date.now()) {
//             return res.status(400).json({
//                 error: true,
//                 message: 'Invalid or expired reset code'
//             });
//         }

//         // If valid, allow them to proceed
//         res.status(200).json({
//             error: false,
//             message: 'Reset code is valid'
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: true,
//             message: 'Error validating reset code'
//         });
//     }
// };

const validateResetCode = async (req, res) => {
    try {
        const { resetCode } = req.body;

        // Find the user by reset code only
        const user = await User.findOne({
            passwordResetCode: resetCode,
            passwordResetExpires: { $gt: Date.now() } // Ensure the code has not expired
        });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: 'Invalid or expired reset code'
            });
        }
      
        const token = jwt.sign({userId:user._id},"secret_key",{expiresIn:"1h"})
        const resetLink = "http://127.0.0.1:5500/frontend/simple-js/resetpassword.html"
        // If valid, allow them to proceed
        res.status(200).json({
            error: false,
            message: 'Reset code is valid',
            resetToken:resetLink
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error validating reset code'
        });
    }
};





module.exports = { login , register , requestPasswordReset , resetPassword , validateResetCode }