const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    picture: { type: String, default: "picture" },
    roll: { type: String, default: "user" },
    address: { type: String, default: "" },
    age: { type: Number, default: null },
    mobile: { type: Number, default: null },
    status: { type: String, default: "active" },
    task: [{ type: String, default: "" }],
  },
  {
    timeseries: true,
    versionKey: false,
  }
);
userModel.methods.MatchPassword = function (password) {
  return this.password == password;
};
userModel.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.PASSCODE);
};
module.exports = mongoose.model("users", userModel);
