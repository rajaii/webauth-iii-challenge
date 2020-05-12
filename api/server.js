const express = require('express');
const server = express();
const authRouter = require('./authRouter.js');
const usersRouter = require('../users/usersRouter.js');


server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.status(200).send('<h1>Enjoy tha Show!!!</h1>')
})

 
module.exports = server;