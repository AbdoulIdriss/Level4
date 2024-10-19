const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        required: true
    }, 
    plan: {
        type:String,
        enum:['free', 'prenium'],
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)