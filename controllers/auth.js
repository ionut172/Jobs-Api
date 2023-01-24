const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/bad-request");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await user.CreateJWT();
    console.log(token);
    res
      .status(StatusCodes.CREATED)
      .json({ msg: `Felicitari ${name}. Token-ul tau este ${token}`, user });
  } catch (err) {
    console.log(err);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ msg: "Please provide user and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    res.status(401).json({ msg: "dasdsa" });
  }
  res.status(201).json(user);
};
module.exports = {
  register,
  login,
};
