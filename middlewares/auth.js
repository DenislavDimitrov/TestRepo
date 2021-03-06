const {SECRET} = require('../config/config');
const jwt = require('jsonwebtoken')

module.exports = function() {
    return (req, res, next) => {
        let token = req.cookies['USER_SESSION']

        if (token){
           jwt.verify(token, SECRET, (err, decoded) => {
           if (err) {
               res.clearCookie('USER_SESSION')
           } else {
            req.user = decoded;    
            res.locals.user = decoded;
            res.locals.isAuthenticated = true;

           }
        });
    }
         
        
        next()
    }
}