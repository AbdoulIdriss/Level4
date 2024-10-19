const express = require('express');
const mongoose = require('mongoose')

const contactRoute = require('./routes/contact.route');
const userRoute = require('./routes/user.route')


// const indexRoute = require('./routes/index.route');

mongoose.connect("mongodb://localhost:27017/user_management", )
    .then( connection => {

        const app = express();
        const port = 3001;

        app.use(express.json());//used to convert request of user to json

        // app.use('/', indexRoute);
        app.use('/contact', contactRoute);
        app.use('/users', userRoute);

        app.listen(port , () => {

            console.log('app is listening on port:' + port );
            
        })

    }).catch(err => {
        console.log('mongoDB connection error :', err);
        
    })