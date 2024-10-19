//to get all users 

getAllUsers = async( req , res ) => {
    const q = "SELECT * FROM users";
    await db.query( q, ( err ,  data ) => {
        if (err) {
            res.json(err)
            console.log(err);
            
        }
        return res.json(data)
    })
}

//create a new user 
 createUser = ( req , res ) => {
    const q = 'INSERT INTO users (username ,email,  userrole, userplan) VALUES(?)';
    const values = await [
        req.body.username,
        req.body.email,
        req.body.userrole,
        req.body.userplan
    ];
    db.query( q , [values] , (err , data ) => {
        if(err) return res.send(err)
        return res.json(data)
    })
 }

 //update an existing book 
updateUser = ( req ,  res ) => {
    const id = req.params.id;
    const q = "UPDATE users SET 'username = ?, email = ? , 'userrole = ?', 'userplan = ?' ";
    const values = await [
        req.body.username,
        req.body.email,
        req.body.userrole,
        req.body.userplan
    ];
    db.query(q, [...values,id], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
}

//delete an existing user 

deleteUser = ( req , res ) => {
    const id = req.params.id;
    const q = 'DELETE FROM users WHERE id = ? '

    db.query(q, [id], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
}

module.exports = { getAllUsers , createUser , updateUser , deleteUser}