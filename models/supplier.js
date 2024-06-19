const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  suppliers: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Deactive'],
    required: true,
  }
}, { _id: true, versionKey: false });

const addSupplierSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.string().required(),
  status: Joi.string().valid('Active', 'Deactive').required()
});

const editSupplierSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  suppliers: Joi.string(),
  date: Joi.string(),
  amount: Joi.string(),
  status: Joi.string().valid('Active', 'Deactive')
});

supplierSchema.post("save", handleMongooseError);

const Supplier = model("supplier", supplierSchema);

const schemas = { addSupplierSchema, editSupplierSchema };

module.exports = { Supplier, schemas };
