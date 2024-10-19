const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const userRoute = require('./Routes/user.route')

const app = express();
const port = 6000;

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json())
app.use('/users', userRoute)

const user_db = mysql.createConnection({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db',
}).promise();

user_db.query(( err, results , field ) => {
    if (err) {
        return console.log(err);
        
    }
    return console.log(results);
    
})

app.listen( port , () =>  {
    console.log('server listening on port:' , port);
    
})