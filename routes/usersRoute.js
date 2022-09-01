const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const { passwordsMatch, isNewUser, encryptPasswords, 
doesUserExist, verifyPass, verifyToken } = require("../middleware/usersMiddleware");
const  { signUpSchema, loginSchema }  = require('../schemas/allSchemas');
const { validateBody } = require('../middleware/validateBody');

router.post(
  "/signup",
  validateBody(signUpSchema),
  passwordsMatch,
  isNewUser,
  encryptPasswords,
  UsersController.signUp
);

router.post(
  "/login",
  validateBody(loginSchema),
  doesUserExist,
  verifyPass,
  UsersController.login
);

router.get("/logout", UsersController.logout);

// router.get("/:userId", verifyToken, UsersController.getUserById);

// router.route("/")
// .post(validateBody, verifyToken, UsersController.addUser)
// .get(verifyToken, UsersController.getAllUsers);
// router.get("/:userId", verifyToken, isAdmin, UsersController.getUserById);

// router.route("/:userId")
// .put(validateBody, verifyToken, UsersController.editUser);

module.exports = router;
