const { getUserByEmailModel } = require('../models/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function passwordsMatch(req, res, next) {
    if(req.body.password === req.body.repeatPassword) {
        next();
        return;
    }
    res.status(400).send('Passwords dont match');
}

function isNewUser(req, res, next) {
    const user = getUserByEmailModel(req.body.email);
    if(user) {
        res.send(400).send('User Email Already Exists');
        return;
    }
    next();
}

function encryptPasswords(req, res, next) {
    bcrypt.hash(req.body.passwrod, saltRounds,(err, hash)=> {
        // Store hash in your password DB.
        next();
    }); 
}

module.exports = { passwordsMatch, isNewUser, encryptPasswords }