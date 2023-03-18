"use strict";
const router = require("express").Router();
const AuthController = require("./controller");
const validator = require("../validator");

router.post("/login", validator.validateLogin, AuthController.login);
router.post("/forget", validator.validateforget, AuthController.forgetPassword);
router.post("/reset", validator.validateResetpassword, AuthController.checkresettoken,AuthController.resetpassword);
router.post("/change-password", validator.validateChangePassword, AuthController.jwtauthorization ,AuthController.changePassword);


module.exports = router;
