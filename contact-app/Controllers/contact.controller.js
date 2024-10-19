contacts = [ 
    {id:1, name: "john", email: "john@example.com", phone: "13456789" },
    {id:2,name: "doe",email: "doe@example.com",phone: "23456789"},
    {d:3,name: "ben",email: "ben@example.com",phone: "4567890"},
    {id:4,name: "idriss",email: "idriss@example.com",phone: "9807654321"},
    {id:5, name: "abdoul",email: "abdoul@example.com",phone: "970876533"}
];

const generateId = () => {
    return contacts[contacts.length - 1].id + 1;
}

const getContactIndexWithId = (id) => {
    return contacts.findIndex(contact => contact.id === parseInt(id));
}

const getAll = (req, res) => {
    res.json(contacts)
}

const getOneById = (req, res) => {
    const id = request.params.id ;

    const contact = contacts.find(contact => contact.id === parseInt(id));

    if(!contact) {
        res.status(404).json({message: 'Contact not found'})
    }else {
        res.json(contact)
    }
}

const createOne = (req, res) => {
    const body = req.body
    contact.push({
        id:generateId(),
        name: body.name,
        email: body.email,
        phone: body.phone
    });
    res.status(201).json({
        eror: false,
        message: 'Contact created successfuly'
        
    })
    
}

const updateOneById = (req, res) => {
    const id = req.params.id;
    const index = getContactIndexWithId(id);
    if(!index) {
        res.status(404).json({
            error: true,
            message: 'Contact not found'
        });
        return ;
    }
    const {name, email, phone} = req.body;
    contacts[index].email = email;
    contacts[index].name = name;
    contacts[index].phone = phone;
    res.json({
        eroor:false,
        message: 'Contact updated successfuly'
    })
}

const deleteOneById = (req, res) => {
    const id = req.params.id
    const index = getContactIndexWithId(id);
    if(!index) {
        res.status(404).json({
            error: true,
            message: 'Contact not found'
        });
        return ;
    }
    contacts.splice(index, 1); // remove the contact from the array
    res.json({
        error: false,
        message: 'Contact deleted successfuly'
    })
}

const sortByQuery = (req, res) => {
    const { key, order } = req.query;
    const sortByKey = contacts.sort((a, b) => {

        if (order === 'desc') {
            return a[key] < b[key]? 1 : -1;
        }
        return a[key] > b[key]? 1 : -1;
    })
    res.json(sortByKey);
}

module.exports = { getAll, getOneById, createOne, updateOneById, deleteOneById, sortByQuery }