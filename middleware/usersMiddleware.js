const { getUserByEmailModel } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function passwordsMatch(req, res, next) {
  if (req.body.password !== req.body.password) {
    res.status(400).send("Passwords dont match");
    return;
  }
  next();
}

async function isNewUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.send(400).send("User Email Already Exists");
    return;
  }
  next();
}

function encryptPasswords(req, res, next) {
  const saltRounds = 12;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.password = hash;
    next();
  });
}

async function doesUserExist(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    req.body.user = user;
    next();
    return;
  }
  res.status(400).send("User with this email does not exist");
}

async function verifyPass(req, res, next) {
  const { user } = req.body;
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Incorrrect Password!");
    }
  });
}

async function authLogin(req, res, next) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized login attempt");
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
      next();
      return;
    }
  });
}

module.exports = {
  passwordsMatch,
  isNewUser,
  encryptPasswords,
  doesUserExist,
  verifyPass,
  authLogin,
};
