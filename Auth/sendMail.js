require('dotenv').config();
//SMTP = Simple Mail Transfer Protocol
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.sendMail({

    from: '"Soul" <process.env.EMAIL>',
    to:   'danieldylan124@gmail.com',
    subject: 'Testing sending mail from backend',
    text: 'Yo Panda san . I am sending this message from my backend app build with Express!'

}).then( send => {
    console.log(send);
}).catch( err => {
    console.log(err)
})