const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./dbconfig/database')


const userRoute = require('./Routes/user.route')

const app = express(); 

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json())
app.use('/users', userRoute)

sequelize.sync()
    .then( () => app.listen(3005 , () => console.log('Server running on http://localhost:3005')))
    .catch( err => console.error('Error connection to database' , err));