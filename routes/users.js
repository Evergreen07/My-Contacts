// Register different users : "SIGN UP"

const bcrypt = require('bcryptjs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../models/User');

//@route    POST /api/users
//@desc     Register a user
//@access   Public

router.post('/',
    [
        check('name','Please enter a name').not().isEmpty(),
        check('email','Please enter a valid email').isEmail(),
        check('password','Please enter a valid password with min 6 characters').isLength({min: 6})
    ],
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Errors : errors.array()});
    }
    
    const { name, email, password } = req.body;

    try {
        let new_user = await User.findOne({ email });

        //Check if the user already exists
        if(new_user){
            return res.status(400).json({msg:'User already exists'});
        }

        new_user = new User({ name, email, password });

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash( password, salt );

        //Saving in the Database
        await new_user.save();

        //res.send('User added !!!');

        //Create Payload & then generate a Token
        const payload = {
            user : {
                id : new_user.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtsecret'),
            {
                expiresIn : 360000
            }, 
            (err, token) => {
            if (err) throw err;
            res.send({ token });
        })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
    
});

module.exports = router;