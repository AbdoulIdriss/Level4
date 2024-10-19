const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());//used to convert request of user to json


// app.use('/', indexRoute)

const contactRoute = require('./routes/contact.route');

app.use('/contact', contactRoute)
// const indexRoute = require('./routes/index.route');

app.listen(port , () => {

    console.log('app is listening on port:' + port );
    
})