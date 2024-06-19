// @ts-nocheck
const express = require("express");
const { authenticate } = require("../../middlewares");
const { getOrders } = require("../../controllers/orders");

const router = express.Router();

router.get("/", authenticate, getOrders);

module.exports = router;