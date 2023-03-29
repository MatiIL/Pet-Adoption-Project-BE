const {
  signUpModel,
  getUserByIdModel,
  updateUserModel,
  getAllUsersModel,
} = require("../models/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req, res, next) {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const { userId } = await signUpModel(req.body);
    if (userId) {
      res.send({ firstName, lastName, email, phone });
      return;
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function login(req, res) {
  const { user } = req.body;
  try {
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      path: "/",
      sameSite: true,
      secure: true,
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
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    res.send({
      id: userId,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      phone: user.phone,
      bio: user.bio,
      savedPets: user.savedPets,
      ownedPets: user.ownedPets,
    });
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

async function getSavedPets(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    // console.log("all saved pets", user.savedPets);
    if (user) res.status(200).send(user.savedPets);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getOwnedPets(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    // console.log("user.fostered", user.fostered);
    // console.log("user.adopted", user.adopted);
    // console.log("all owned pets", {
    //   fostered: user.fosteredPets || [],
    //   adopted: user.adoptedPets || [],
    // });
    if (user)
      res
        .status(200)
        .send({ fostered: user.fosteredPets, adopted: user.adoptedPets });
  } catch (err) {
    res.status(400).send(err.message);
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
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    if (user.errors) {
      throw new Error(user.errors);
    } else res.status(200).send(user);
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
  getSavedPets,
  getOwnedPets,
  getAllUsers,
  getFullUser,
};
