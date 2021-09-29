const express = require('express');
const api = express.Router();
const { login } = require('./accounts/login.js')
const { createUser } = require('./accounts/create-user');



api.post('/login', login)
api.post('/create-user', createUser);

module.exports = api;