const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const userDb = require('../users/userHelpers.js');

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
     if(tokenHeader) {
         //this stuff he added after lecture did not work
        // const tokenStrings = tokenHeader.split(" ");
        // if(tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[1]) {
             jwt.verify(tokenHeader, secrets.jwtSecret, (err, decodedToken) => {
                 if (err) {
                     res.status(401).json({message: "you shall not pass"});
                 } else {
                     req.decodedJwt = decodedToken;
                     next()
                 }
             })
         }
     else {
         res.status(401).json({message: "missing header, you shall not pass"})
     }
}