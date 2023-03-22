const { auth } = require("../../middleware/auth");
const { Upload } = require("../../middleware/fileUpload");
const { validate } = require("../../middleware/validate");
const {
  fileupload,
  getFileImageUrl,
} = require("../controller/fileuploadcontroller");
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
routers.patch("/updateuser", updateuser);
routers.post("/adduser", adduser);
routers.get("/logout", logout);
routers.get("/getuser", getuser);
routers.get("/getusers", getusers);
routers.post("/file/upload", Upload.single("file"), fileupload);
routers.get("/file/:filename", getFileImageUrl);

module.exports = routers;
