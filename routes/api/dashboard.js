// @ts-nocheck
const express = require("express");
const { authenticate } = require("../../middlewares");
const { getDashboardInfo } = require("../../controllers/dashboard");

const router = express.Router();

router.get("/", authenticate, getDashboardInfo);

module.exports = router;