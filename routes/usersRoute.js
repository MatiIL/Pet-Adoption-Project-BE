const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const { passwordsMatch, isNewUser, encryptPasswords, doesUserExist, verifyPass } = require("../middleware/usersMiddleware");
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
)

router.get("/:userId", (req,res) => {
  console.log(req.body);

})

module.exports = router;
