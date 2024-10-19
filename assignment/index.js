const express = require('express');
const app = express();
app.use(express.json())
const port = 3500;

let users = [
    {
        id:1,
        "name":"abdoul",
        "email":"abdoul4@gmail.com"
    },
    {
        id:2,
        "name":"ben",
        "email":"ben4@gmail.com"
    },
    {
        id:3,
        "name":"idriss",
        "email":"idriss4@gmail.com"
    }
]

function findUserWithId(id) {
    let user = null;
    for (let i = 0; i < users.length; i++) {

        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    return user;
}

function getIndexUserById(id){
    let index = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id ) {
            index = i;
            break;
        }
    }
    return index;
}

function generateId(){
    return users[users.length - 1].id + 1;
}

//will be used for middleware 
function verifyDataBeforeupdateUser(req , res, next){
    const id = req.params.id;
    const index = getIndexUserById(id);
    if (!index) {
        res.status(404).json({message:"user not found"})
        return;
    }
    const { name, email } = request.body;
    if (!name || !email) {
        res.status(404).json({message:"Name and email not found"})
        return;
    }

    request.userIndex = index; //update request
    next(); //call the next functionality
}

//Getting all the users 
app.get('/api/users', ( req, res ) => {
    res.status(200).json(users);
})

//Get a user by id 
app.get('/api/users/:id', ( req, res ) => {
    const userId = req.params.id;
    let user = findUserWithId(userId)
    if (user) {
        res.json(user)
    } else {
        res.sendStatus(404).json({message:"user not found"})
    }
})

//To create a user 
app.post('/api/users/create', ( req, res ) => {
    const body = req.body;
    console.log(req.body);

    const user = { id: generateId(), ...body }; //adding the body tree dits 

    users.push(user);

    res.status(201).json(user)
    
})

app.put('/api/users/:id', ( req , res ) => {
    const id = req.params.id;
    let user = findUserWithId(id);
    if (user) {

        user = { ...users, ...req.body }; //merge new data with the existing user
        users = users.map( i => ( i.id === id? user : i )); //update the user in the array

        res.status(200).json({message:"user updated successfuly"});
    } else {

        res.status(404).json({message: "User not found"});
    }
})

//creating put with middleware
app.put('/api/users/:id', verifyDataBeforeupdateUser, (req, res) => {
    const index = req.userIndex;
    const newData = req.body;

    users[index].email = newData.email;
    users[index].name = newData.name;

    res.json(users[index])
})

app.delete('/api/users/:id', ( req , res ) => {
    const id = parseInt(req.params.id);
    let user = findUserWithId(id);
    if (user) {
        users = users.filter( i => i.id !== id); //remove the user
        res.send(200).json({message:"user deleted successfuly"});
    } else {
        res.status(404).json({messsage: "user not found"});
    }
})

app.listen(port, () => {
   
    console.log("Application running on port http://localhost: " + port);
    
})