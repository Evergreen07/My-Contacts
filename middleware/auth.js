//We need to authenticate the routes through middleware

const jwt =  require('jsonwebtoken');
const config =  require('config');
const { check } = require('express-validator');

module.exports = (req, res, next) => {
    //Get token from the Header
    const token = req.header('x-auth-token');

    // Check token
    if(!token){
        return res.status(401).json({msg : 'No token, Authorization denied !!!'});
    }

    // Verify token
    try {
        //Pull out the payload from the token
        const decoded = jwt.verify(token, config.get('jwtsecret'));

        req.user = decoded.user; 
        // Payload has the variable 'user' which inturn has the credentials of 'new_user'
        next();
    } catch (err) {
        res.status(401).json({msg : 'Token Invalid !!!'});
    }
    
}