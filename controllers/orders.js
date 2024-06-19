const { ctrlWrapper } = require("../helpers");
const { Order } = require("../models/order");

const getOrders = async (req, res) => {
    const { query } = req.query;
    let orders;
    if (query) {
        orders = await Order.find({
            name: { $regex: query, $options: 'i' }
        });
    } else {
        orders = await Order.find();
    }
    res.json(orders);
};

module.exports = {
    getOrders: ctrlWrapper(getOrders)
};