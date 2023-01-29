const {
  getUserByEmailModel,
  getUserByIdModel,
  emailComparator,
  queryRolesDB,
} = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function passwordsMatch(req, res, next) {
  if (req.body.password !== req.body.repeatPassword) {
    res.status(400).send("Passwords dont match");
    return;
  }
  next();
}

async function isNewUser(req, res, next) {
  try {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
      res.status(400).send("User Email Already Exists");
      return;
    }
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function hashPasswords(req, res, next) {
  const saltRounds = 12;
  if (req.body.password !== "") {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      req.body.password = hash;
      next();
    });
  } else {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    req.body.password = user.password;
  }
}

async function doesUserExist(req, res, next) {
  try {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
      req.body.user = user;
      next();
      return;
    }
    res.status(400).send("User with this email does not exist");
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
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

async function verifyToken(req, res, next) {
  const { token } = req.cookies;
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

async function didEmailChange(req, res, next) {
  const { userId, email } = req.body;
  try {
    const isEmailUnique = await emailComparator(userId, email);
    if (isEmailUnique) {
      next();
      return;
    } else res.send("User Email Already Exists");
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function didPassChange(req, res, next) {
  if (!req.body.password) {
    next();
    return;
  } else {
    if (req.body.password !== req.body.repeatPassword) {
      res.status(400).send("Passwords dont match");
      return;
    }
    const saltRounds = 12;
    if (req.body.password !== "") {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        req.body.password = hash;
        next();
      });
    }
  }
}

async function isAdmin(req, res, next) {
  const { userId } = req.body.user;

  try {
    const isUser = await queryRolesDB(userId);
    if (isUser === undefined) {
      req.body.isAdmin = false;
      next();
      return;
    } else {
      req.body.isAdmin = isUser.admin;
      next();
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function authAdmin(req, res, next) {
  const { userId } = req.body;
  try {
    const isUser = await queryRolesDB(userId);
    if (isUser === undefined) {
      req.body.isAdmin = false;
      next();
      return;
    } else {
      req.body.isAdmin = isUser.admin;
      next();
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function isReqAuthorized(req, res, next) {
  let userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else userId = req.params;
  try {
    const isAuthorized = await queryRolesDB(userId);
    if (isAuthorized) {
      next();
    } else {
      res.status(403).send("Forbidden access");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  passwordsMatch,
  isNewUser,
  hashPasswords,
  doesUserExist,
  verifyPass,
  verifyToken,
  didEmailChange,
  didPassChange,
  isAdmin,
  authAdmin,
  isReqAuthorized,
};
