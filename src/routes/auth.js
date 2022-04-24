"use strict";
const AuthController = require("../controllers/AuthController");
const express = require("express"),
  router = express.Router();

router.post("/login", AuthController.login);
router.get("/logout", AuthController.checkLogin, AuthController.logout);
router.post("/register", AuthController.register);
router.post(
  "/change-password",
  AuthController.checkLogin,
  AuthController.changePassword
);

module.exports = router;
