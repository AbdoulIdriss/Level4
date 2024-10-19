const Contact = require('../Models/Contacts')



const getAll = async(req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts)
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error retriving contacts'
        })
    }
}

const getOneById = async(req, res) => {

    try {
        
        const id = request.params.id;

        const contact = await Contact.find({_id: id});
    
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' })
        } else {
            res.json(contact)
        }

    } catch (error) {

        response.status(500).json({
            error: true,
            message: 'Error retriving contact'
        })
    }

}

const createOne = async (req, res) => {

    const body = req.body

    const newContact = new Contact({
        name: body.name,
        email: body.email,
        phone: body.phone
    });
    try {
        await newContact.save();

        res.status(201).json({
            eror: false,
            message: 'Contact created successfuly'
        })
    } catch (error) {
        res.status(500).json({
            eror: true,
            message: 'error saving contact'
        })
    }




}

const updateOneById = async(req, res) => {

    try {
        
        const id = req.params.id;

        const body = req.body;

        await Contact.findByIdAndUpdate(id , {...body});

        res.json({ 
            error: false ,
            message: ' Contact updated succesfuly'
        })

    } catch (error) {
        res.json({
            error: false,
            message: 'Contact ot found'
        })
    }


}

const deleteOneById = async(req, res) => {

    try {
        const id = req.params.id
        await Contact.findByIdAndDelete(id)
        res.json({
            error:false,
            message:'contact deleted succesfully'
        })

    } catch (error) {

        res.json({
            error:true,
            message:'could not deleted contact'
        })
    }

}

const sortByQuery = (req, res) => {
    const { key, order } = req.query;
    const sortByKey = contacts.sort((a, b) => {

        if (order === 'desc') {
            return a[key] < b[key] ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
    })
    res.json(sortByKey);
}

module.exports = { getAll, getOneById, createOne, updateOneById, deleteOneById, sortByQuery }