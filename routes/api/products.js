// @ts-nocheck
const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/product");
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require("../../controllers/products");

const router = express.Router();

router.get("/", authenticate, getAllProducts );

router.post("/", authenticate, validateBody(schemas.addProductSchema), addProduct );

router.put("/:_id", authenticate, validateBody(schemas.editProductSchema), updateProduct );

router.delete("/:_id", authenticate, deleteProduct );

module.exports = router;