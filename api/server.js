const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome! Go to /accounts to get more info'
    })
})
server.use('/accounts/', accountsRouter )

module.exports = server;
