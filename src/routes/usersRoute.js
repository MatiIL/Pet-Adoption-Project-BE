const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { 
  passwordsMatch, 
  isNewUser, 
  hashPasswords, 
  doesUserExist, 
  verifyPass, 
  verifyToken, 
  didEmailChange, 
  didPassChange, 
  isAdmin, 
  getUserPets,
  authAdmin, 
  isReqAuthorized 
} = require("../middleware/usersMiddleware");
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
  isAdmin,
  UsersController.login
);

router.put("/:userId", 
verifyToken, 
validateBody(updateUserSchema), 
didEmailChange,
didPassChange,
UsersController.editUser);

router.get("/logout", UsersController.logout);
router.get("/", verifyToken, authAdmin, getUserPets, UsersController.authUser);
router.get("/:userId/full", verifyToken, isReqAuthorized, UsersController.getFullUser); 
router.get("/all-users", verifyToken, isReqAuthorized, UsersController.getAllUsers); 

module.exports = router;
