const  {Schema , default: mongoose}  = require('mongoose');

const contactSchema = new Schema ({

    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
});


module.exports = mongoose.model('contact', contactSchema );