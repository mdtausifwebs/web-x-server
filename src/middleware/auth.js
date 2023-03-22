const jwt = require("jsonwebtoken");
const userModel = require("../files/model/usermodel");
const auth = async (req, res, next) => {
  const { Token } = await req.cookies;
  // console.log("Token", Token);
  if (!Token) {
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  }
  const matchuser = await jwt.verify(Token, process.env.passcode);
  //   console.log('matchuser', matchuser);
  req.user = await userModel.findById(matchuser.id);
  next();
};
module.exports = { auth };


