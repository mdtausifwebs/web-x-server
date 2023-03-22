const grid = require("gridfs-stream");
const mongoose = require("mongoose");
const conn = mongoose.connection;
let gridFsBucket, gfs;
const url = "http://localhost:4000";
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});


const fileupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({
        success: false,
        message: "file not found",
      });
    }
    const imageurl = `${url}/api/v1/file/${req.file.filename}`;
    // console.log('imageurl', imageurl);
    return res.status(200).json({
      imageurl,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getFileImageUrl = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
    // console.log(readStream)
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = { fileupload ,getFileImageUrl};


