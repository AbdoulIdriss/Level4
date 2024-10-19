const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth')

    .then(connection => {
        
        const app = express()
        app.arguments(express.json());

        const authRoute = require('./routes/auth.route');
        const adminRoute = require('./routes/admin.route');

        app.use('/api/auth', authRoute);
        app.use('/api/auth', adminRoute);
        

        app.listen(3000, () => {

            console.log('listening on http://localhost:3000');
            
        })

    }).catch(err => {

        console.error(err);
        
    });