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

router.route("/")
// .post(validateBody, verifyToken, UsersController.addUser)
// .get(verifyToken, UsersController.getAllUsers);

router.route("/:userId")
.get(verifyToken, UsersController.getUserById)
// .put(validateBody, verifyToken, UsersController.editUser);

module.exports = router;
