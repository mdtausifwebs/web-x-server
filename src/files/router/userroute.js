const { auth } = require("../../middleware/auth");
const { Upload } = require("../../middleware/fileUpload");
const { validate } = require("../../middleware/validate");
const { fileupload, getFileImageUrl } = require("../controller/fileuploadcontroller");
const {
  getuser,
  logout,
  register,
  login,
  updateuser,
  getusers,
  adduser,
} = require("../controller/usercontroller");
const routers = require("express").Router();

routers.post("/signup", register);
routers.post("/login", login);
routers.patch("/updateuser", auth, validate, updateuser);
routers.post("/adduser", auth, validate, adduser);
routers.get("/logout", auth, logout);
routers.get("/getuser", auth, getuser);
routers.get("/getusers", auth, getusers);
routers.post("/file/upload", Upload.single("file"),auth, fileupload);
routers.get("/file/:filename", getFileImageUrl);

module.exports = routers;

