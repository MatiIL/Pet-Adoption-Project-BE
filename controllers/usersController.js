const { signUpModel } = require("../models/usersModel");
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
    res.send({ userId: userId, email, firstName });
  } catch (err) {
    console.log(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, { maxAge: 100000000000 });
    res.send({ user: user.name, ok: true });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { signUp, login };