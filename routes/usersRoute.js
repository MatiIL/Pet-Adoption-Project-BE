const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const { passwordsMatch, isNewUser, hashPasswords, 
doesUserExist, verifyPass, verifyToken, didEmailChange, didPassChange } = require("../middleware/usersMiddleware");
const  { signUpSchema, loginSchema, updateUserSchema }  = require('../schemas/allSchemas');
const { validateBody } = require('../middleware/validateBody');

router.post(
  "/signup",
  validateBody(signUpSchema),
  passwordsMatch,
  isNewUser,
  hashPasswords,
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

router.get("/", verifyToken, UsersController.identifyUser);

// router.route("/")
// .post(validateBody, verifyToken, UsersController.addUser)

router.get("/:userId/full", verifyToken, UsersController.getFullUser); //isAdmin


router.put("/:userId", 
verifyToken, 
validateBody(updateUserSchema), 
didEmailChange,
didPassChange,
UsersController.editUser);

router.get("/all-users", verifyToken, UsersController.getAllUsers);

module.exports = router;
