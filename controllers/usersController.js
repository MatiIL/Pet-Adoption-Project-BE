const { signUpModel, getUserByIdModel } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req, res) {
  try {
    const { email, password, repeatPassword, firstName, lastName, phone } = req.body;
    const newUser = {
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
      phone
    };
    const userId = await signUpModel(newUser);
    if(userId.error)  {
      throw new Error(userId.error);
  }
    res.send({ userId: userId, email, firstName, lastName });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, { maxAge: 900000, httpOnly: true});
      // sameSite: 'none', 
      // secure: false, 
      // signed: true,
     
    res.send({ user: user.firstName, ok: true });
  } catch (err) {
    console.log(err);
  }
}

function logout(req, res) {
  try {
    if (req.cookies.token) {
      res.clearCookie("token");
      res.send({ ok: true });
    } else {
      throw new Error("No cookie to clear");
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await getUserByIdModel({ userId });
    if(user.error) throw new Error(user.error);
    else res.send(user);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
}

module.exports = { signUp, login, logout, getUserById };