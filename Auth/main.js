require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect(process.env.DATABASE_URL)

    .then(connection => {
        
        const app = express()
        app.use(cors())
        app.use(express.json());

        const authRoute = require('./routes/auth.route');
        const adminRoute = require('./routes/admin.route');

        app.use('/auth', authRoute);
        app.use('/admin', adminRoute);
        

        app.listen(process.env.PORT , () => {

            console.log('listening on http://localhost:3000');
            
        })

    }).catch(err => {

        console.error(err);
        
    });