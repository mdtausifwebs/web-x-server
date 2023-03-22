const mongoose = require("mongoose");
const db = () => {
  mongoose
    .connect(process.env.DBURL)
    .then((data) => {
      console.log(`connect db ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`not connect db ${err}`);
    });
};
module.exports = db;
