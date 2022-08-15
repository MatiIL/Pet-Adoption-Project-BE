const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { passwordsMatch, isNewUser, encryptPasswords } = require("../middleware/usersMiddleware");
const { signupSchema } = require('../schemas/userSchemas')
const { validateBody } = require('../middleware/validateBody');

router.get("/");

router.post(
  "/signup",
  validateBody(signupSchema),
  passwordsMatch,
  isNewUser,
  encryptPasswords,
  UsersController.signup
);

module.exports = router;
