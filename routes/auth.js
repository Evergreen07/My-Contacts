// Authenticate users : "LOG-IN / SIGN-IN"

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

//@route    GET /api/auth
//@desc     Get Logged In user (Verified User is Logged In)
//@access   Private
router.get('/', auth, async (req, res) => {
    //res.send('Get LoggedIn user');
    try {
        const login_user = await User.findById(req.user.id);
        res.json(login_user);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server Error'});
    }
})


//@route    POST /api/auth
//@desc     Auth User & get token (User enters login credentials)
//@access   Public
router.post('/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password').exists()
    ],
    async (req,res) => {
    //res.send('Log In user');
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors});
    }

    const { email, password } = req.body;

    try {
        let new_user = await User.findOne({ email });

        if(!new_user){
            return res.status(400).json({msg : 'Invalid Credentials : Email '});
        }

        const match = await bcrypt.compare(password, new_user.password);
        
        if(!match){
            return res.status(400).json({msg : 'Invalid Credentials : Password '});
        }

        //res.send('User Logged In !!!');

        //Create Payload & then generate a Token
        const payload = {
            user : {
                id : new_user.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtsecret'),
            {
                expiresIn : 3600
            }, 
            (err, token) => {
            if (err) throw err;
            res.send({ msg: 'Logged In Successfully', token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error Catch');
    }
})

module.exports = router;