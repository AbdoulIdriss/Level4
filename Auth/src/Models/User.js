const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type:String,
        required: true,
        unique: true
    },
    
    password: {
        type:String,
        required: true
    },

    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    passwordResetCode: {
        type: String,
        required: false // Only set when a reset is requested
    },
    passwordResetExpires: {
        type: Date,
        required: false // Only set when a reset is requested
    }
})

module.exports = mongoose.model('user', userSchema);