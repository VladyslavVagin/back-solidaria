const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { ObjectId } = require( "mongodb" );

const customerSchema = new Schema(
  {
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    spent: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    register_date: {
      type: String,
      required: true,
    },
  }
);

customerSchema.post("save", handleMongooseError);

const Customer = model("customer", customerSchema);

module.exports = { Customer };