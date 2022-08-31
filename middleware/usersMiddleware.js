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
  const { user, password } = req.body;
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      next();
    } else {
      res.status(400).send("Incorrect Password");
    }
  });
}

// async function authLogin(req, res, next) {
//   try {
//     const { user, token } = req.body;
//     res.cookie('token', token, { maxAge: 900000, httpOnly: true, sameSite: 'none', secure: false});
//     res.send({name: user.firstName, id: user.id,});
//     next();
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }

async function verifyToken(req, res, next) {
  const { token } = req.cookies; //token is undefined
  console.log(token);
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    req.body.userId = decoded.id;
    next();
  });
}


module.exports = {
  passwordsMatch,
  isNewUser,
  encryptPasswords,
  doesUserExist,
  verifyPass,
  verifyToken
};
