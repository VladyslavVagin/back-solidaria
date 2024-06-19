const { ctrlWrapper } = require("../helpers");
const { Dashboard } = require("../models/dashboard.js");
const { Product } = require("../models/product.js");
const { Supplier } = require("../models/supplier.js");
const { Customer } = require("../models/customers.js");

const getDashboardInfo = async (req, res) => {
    const dashboard = await Dashboard.find();
    const productsCount = await Product.countDocuments();
    const suppliersCount = await Supplier.countDocuments();
    const customersCount = await Customer.countDocuments();
    const customers = await Customer.find().sort({ register_date: -1 }).limit(5);
    res.json({ dashboard, productsCount, suppliersCount, customersCount, customers });
};

module.exports = {
    getDashboardInfo: ctrlWrapper(getDashboardInfo),
};