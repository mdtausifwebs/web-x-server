const userModel = require("../model/usermodel");

const register = async (req, res) => {
  // console.log('req', req);
  try {
    let user = await userModel.findOne({ email: req.body.email });
    const cookieConfig = {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
      SameSite:strict,
    };
    if (user) {
      return res.status(400).json({
        success: true,
        message: "you are already user",
      });
    }
    user = await userModel.create(req.body);
    const token = await user.genrateToken();
    await res.cookie("Token", token, cookieConfig);
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");
      const cookieConfig = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'none',
      };
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "user not found",
      });
    }
    const matchpassword = await user.MatchPassword(req.body.password);
    if (!matchpassword) {
      return res.status(400).json({
        success: true,
        message: "email or password not match",
      });
    }
    const token = await user.genrateToken();
    await res.cookie("Token", token, cookieConfig);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  await res.cookie("Token", "", Date(Date.now()));
  res.status(200).json({
    success: true,
    message: "logout successfull",
  });
};

const getuser = async (req, res) => {
  const user = req.user;
  // console.log('user', user);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    user,
  });
};
const updateuser = async (req, res) => {
  try {
    let user = req.user;
    // console.log("req.body", req.body);
    user = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log("user", user);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const getusers = async (req, res) => {
  const users = await userModel.find();
  // console.log('user', user);
  if (!users) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    users,
  });
};
const adduser = async (req, res) => {
  try {
    // console.log('req.body 130', req.body);
    let user = await userModel.findOne({ email: req.body.email });
    // console.log('req.body 132', req.body);
    if (user) {
      return res.status(400).json({
        success: true,
        message: "you are already user",
      });
    }
    user = await userModel.create(req.body);
    // console.log('req.body 140', req.body);
    // console.log('user 141', user);
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  register,
  login,
  getuser,
  logout,
  updateuser,
  getusers,
  adduser,
};
