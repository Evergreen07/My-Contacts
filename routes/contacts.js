// CRUD Operations of Contacts

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET /api/contacts
//@desc     Get all User's contacts
//@access   Private
router.get('/', auth, async (req,res) => {
    //res.send('Get all contacts of the user.');
    try {
        const contacts = await Contact.find({user : req.user.id}).sort({date : -1});
        res.send(contacts); 
    } catch (error) {
       console.error(error.message); 
       res.status(500).send('Server Error');
    }
});


//@route    POST /api/contacts
//@desc     Add Contact 
//@access   Private
router.post('/', 
    [auth, 
    [
        check('name','Name is Required').notEmpty()
    ]], 
    async (req,res) => {
    //res.send('Add contact of the user');
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Errors : errors.array()});
    }
    
    const { name, email, phone, type } = req.body;

    try {
        const new_contact = new Contact({
            name, email, phone, type, user : req.user.id
        })

        const contact = await new_contact.save();
        res.send(contact);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});


//@route    PUT /api/contacts
//@desc     Update Contact
//@access   Private
router.put('/:id', auth, async (req,res) => {
    //res.send('Update contact of the user');
    const { name, email, phone, type } = req.body;

    //Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).send('Contact not found');
        }

        //Checking if the logged in user owns the contact of the user in the params.
        if(contact.user.toString() !== req.user.id){
            return res.status(401).send('Not Authorized')
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { $set : contactFields },
            { new : true }
        );

        res.send(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@route    DELETE /api/contacts
//@desc     Delete Contact
//@access   Private
router.delete('/:id', auth, async(req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({msg: 'Contact not found'});
        }

         // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;