const mongoose = require("mongoose");
const fileupload = new mongoose.Schema(
  {
    name: String,
    url: String,
    type: String,
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("file", fileupload);


