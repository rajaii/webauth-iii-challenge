const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const router = express.Router();
const userDb = require('../users/userHelpers.js');

//base route is /api
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    userDb.create(user)
    .then(u => {
        res.status(201).json(user);
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  userDb.findBy(username)
  .first()
  .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({message: 'hi user', token}); 
      } else {
          res.status(401).json({message: "unauthorized user"});
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err);
  })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options);
}

module.exports = router;