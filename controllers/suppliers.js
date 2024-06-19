const { ctrlWrapper } = require("../helpers");
const { Supplier } = require("../models/supplier.js");

const getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
};

const addSupplier = async (req, res) => {
  const { name } = req.body;
  const existingSupplier = await Supplier.findOne({ name });
  if (existingSupplier) {
    res.status(400).json({ message: "Supplier with this name already exists" });
  } else {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  }
};

const editSupplier = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;
  const supplier = await Supplier.findOne({ _id: _id });
  if (!supplier) {
    res.status(404).json({ message: "Supplier not found" });
  } else {
    const existingSupplier = await Supplier.findOne({ name });
    if (existingSupplier && existingSupplier._id.toString() !== _id) {
      res
        .status(400)
        .json({ message: "Supplier with this name already exists" });
    } else {
      await Supplier.findByIdAndUpdate(_id, req.body);
      res.json({ message: "Supplier updated" });
    }
  }
};

module.exports = {
  getAllSuppliers: ctrlWrapper(getAllSuppliers),
  addSupplier: ctrlWrapper(addSupplier),
  editSupplier: ctrlWrapper(editSupplier),
};
