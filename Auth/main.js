const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/auth')

    .then(connection => {
        
        const app = express()
        app.use(cors())
        app.use(express.json());

        const authRoute = require('./routes/auth.route');
        const adminRoute = require('./routes/admin.route');

        app.use('/auth', authRoute);
        app.use('/admin', adminRoute);
        

        app.listen(3001, () => {

            console.log('listening on http://localhost:3001');
            
        })

    }).catch(err => {

        console.error(err);
        
    });