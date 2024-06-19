// @ts-nocheck
const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user.js");
const { login, register, getUserInfo, logout, changePassword } = require("../../controllers/auth.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/user-info", authenticate, getUserInfo);

router.put("/change-password", authenticate, validateBody(schemas.changePasswordSchema), changePassword);

router.get("/logout", authenticate, logout);

module.exports = router;
