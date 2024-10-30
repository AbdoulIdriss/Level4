// const mysql = require('mysql2')

// const pool = mysql.createConnection({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'users_db',
// }).promise();

// //get users 

// getUsers = async( req , res ) => {
//     const [rows] = await pool.query("SELECT * FROM users")
//     res.json([rows])
// };

// getUser = async( req, res ) => {
    
//     const id = req.params.id;

//     const [rows] = await pool.query("SELECT * FROM users WHERE id = ? ", [id]);

//     res.json([rows])
// }

// createUser = async( req, res ) => {
//     const body = req.body;
//    const result = await pool.query("INSERT INTO users (username, email, userrole,userplan VALUES (? , ?, ?, ?) )", [username,email,userrole,userplan]);
//    res.json(result);
// }
