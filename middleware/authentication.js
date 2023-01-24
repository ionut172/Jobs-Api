const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");

const verifing = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json("Please provide data");
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  if (token) {
    return jwt.verify(token, "jwtsecret", function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      }
      req.user = decoded;
      return next();
    });
  }
};
module.exports = verifing;
