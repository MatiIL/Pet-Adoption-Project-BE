const {
  signUpModel,
  getUserByIdModel,
  updateUserModel,
  getAllUsersModel,
} = require("../models/usersModel");
const { getUserPetsModel } = require("../models/petsModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req, res) {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      phone,
    };
    const userId = await signUpModel(newUser);
    if (userId.error) {
      throw new Error(userId.error);
    } else res.send({ userId: userId, email, firstName, lastName });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
      path: "/",
      // sameSite: true,
      // secure: true,
    });

    const safeUserObj = Object.assign({ ...user });
    delete safeUserObj.password;
    res.send({ user: safeUserObj, ok: true });
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
    console.log(err);
  }
}

async function authUser(req, res) {
  try {
    const { userId, isAdmin } = req.body;
    const user = await getUserByIdModel(userId);
    if (user.error) throw new Error(user.error);
    else {
      const safeUserObj = Object.assign({ ...user });
      delete safeUserObj.password;
      safeUserObj.isAdmin = isAdmin;
      res.send(safeUserObj);
    }
  } catch (err) {
    console.log(err);
  }
}

async function editUser(req, res) {
  try {
    const { userId, email, password, firstName, lastName, phone, bio } =
      req.body;
    const newDetails = {
      email,
      password,
      firstName,
      lastName,
      phone,
      bio,
    };
    const updatedUser = await updateUserModel(userId, newDetails);
    if (updatedUser.error) {
      throw new Error(updatedUser.error);
    } else {
      const safeUserObj = Object.assign({ ...updatedUser });
      delete safeUserObj.password;
      res.send(safeUserObj);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    if (user.error) throw new Error(user.error);
    else {
      const safeUserObj = Object.assign({ ...user });
      delete safeUserObj.password;
      res.send(safeUserObj);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await getAllUsersModel();
    if (allUsers.error) throw new Error(allUsers.error);
    else res.send(allUsers);
  } catch (err) {
    console.log(err);
  }
}

async function getFullUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await getUserByIdModel(userId);
    if (user.error) throw new Error(user.error);
    else {
      const safeUserObj = Object.assign({ ...user });
      delete safeUserObj.password;
      const allUserPets = await getUserPetsModel(userId);
      if (allUserPets.error) throw new Error(allUserPets.error);
      else {
        const ownedPets = allUserPets[0];
        res.status(200).send([safeUserObj, ownedPets]);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signUp,
  login,
  logout,
  getUserById,
  authUser,
  editUser,
  getAllUsers,
  getFullUser,
};
