const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword
  });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Wrong credentials");
    }
  
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    // @ts-ignore
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ token, name: user.name, email: user.email, _id: user._id });
  };

  const getUserInfo = async (req, res) => {
    const { email, name, _id } = req.user;
    res.json({ _id, email, name });
  };
  
  const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({ message: "Logout success" });
  };

  const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
  
    const user = await User.findById(_id);
    if (!user) {
      throw HttpError(404, "User not found");
    }
  
    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Old password is wrong");
    }
  
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(_id, { password: hashPassword });
  
    res.json({ message: "Password changed successfully" });
  };
  
  module.exports = {
    login: ctrlWrapper(login),
    register: ctrlWrapper(register),
    getUserInfo: ctrlWrapper(getUserInfo),
    logout: ctrlWrapper(logout),
    changePassword: ctrlWrapper(changePassword),
  };