const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
  name: [
    {
      type: String,
      required: [true, "Please provivde a name"],
      lowercase: true,
      minlength: [3, "Your name is too short"],
      maxlength: [10, "Your name is too long."],
    },
  ],
  email: [
    {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ["Please provide valid email"],
      ],
      unique: true,
    },
  ],
  password: {
    type: String,
    required: [true, "Please  provide password"],
    minlength: 6,
    maxlength: 1200,
  },
});
UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
UserSchema.methods.CreateJWT = async function () {
  return jwt.sign({ userId: this._id, name: this.name }, "jwtsecret", {
    expiresIn: "30d",
  });
};
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcryptjs.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
