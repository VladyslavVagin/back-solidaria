// @ts-nocheck
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/api/user");
const customersRouter = require("./routes/api/customers");
const suppliersRouter = require("./routes/api/suppliers");
const productsRouter = require("./routes/api/products");
const ordersRouter = require("./routes/api/orders");
const dashboardRouter = require("./routes/api/dashboard");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/customers", customersRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/dashboard", dashboardRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
