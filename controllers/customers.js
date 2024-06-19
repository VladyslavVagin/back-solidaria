const { Customer } = require("../models/customers.js");
const { ctrlWrapper } = require("../helpers");

const getAllCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};

const getCustomer = async (req, res) => {
    const { _id } = req.params;
    const customer = await Customer.findOne({ _id: _id });
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
}

module.exports = {
    getAllCustomers: ctrlWrapper(getAllCustomers),
    getCustomer: ctrlWrapper(getCustomer)
  };