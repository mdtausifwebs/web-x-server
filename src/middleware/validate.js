const jwt = require("jsonwebtoken");
const userModel = require("../files/model/usermodel");
const validate = async (req, res, next) => {
  const user = req.user;
  if (user.roll === "user") {
    return res.status(404).json({
      success: false,
      message: "user are not authorized",
    });
  }
  next();
};
module.exports = { validate };
