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
  isReqAuthorized 
} = require("../middleware/usersMiddleware");
const  { signUpSchema, loginSchema }  = require('../schemas/validationSchemas');
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

router.put("/:userId", 
verifyToken, 
didEmailChange,
didPassChange,
UsersController.editUser);

router.get("/logout", UsersController.logout);
router.get("/authentication", verifyToken, UsersController.authUser);
router.get('/saved-pets', verifyToken, UsersController.getSavedPets);
router.get('/owned-pets', verifyToken, UsersController.getOwnedPets);
router.get("/:userId/full", verifyToken, isReqAuthorized, UsersController.getFullUser); 
router.get("/all-users", verifyToken, isReqAuthorized, UsersController.getAllUsers); 

module.exports = router;
