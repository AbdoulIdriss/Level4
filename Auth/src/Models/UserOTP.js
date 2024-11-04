const mongoose = require('mongoose');
const { Schema } = mongoose;

const userOTPSchema = new Schema({
    code:{
        type: String,
        required: true,
    },
    expired_at:{
        type: Date,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model('userOTP', userOTPSchema);