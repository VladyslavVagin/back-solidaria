const { Schema, model } = require("mongoose");
const { ObjectId } = require( "mongodb" );
const { handleMongooseError } = require("../helpers");

const orderSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    products: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Confirmed", "Shipped", "Delivered", "Completed", "Processing", "Cancelled", "Pending"],
        required: true,
    },
    order_date: {
        type: String,
        required: true,
    },
});

orderSchema.post("save", handleMongooseError);

const Order = model("order", orderSchema);

module.exports = { Order };

