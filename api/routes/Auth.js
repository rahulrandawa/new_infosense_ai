const express = require("express");
const { registerUser } = require("../controller/Auth");
 //const { handleValidationErrors } = require("../middleware/Validate");
// const { SignupValidations } = require("../validations/User");
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser)


module.exports = AuthRouter;