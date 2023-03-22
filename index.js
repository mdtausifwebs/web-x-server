const express = require("express");
const App = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./database/.env" });
const db = require("./database/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./src/files/router/userroute");
App.set("trust proxy", 1);
App.use(express.json());

App.use(bodyParser.urlencoded({ extended: true }));
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    origin: true,
    preflightContinue: false,
  })
);

App.use("/api/v1", userRoute);
App.get("/",async(req,res)=>{
  res.status(200).json({
    message:{
      getapi:"server is working fine "
    }
  })
})
App.listen(process.env.PORT, async () => {
  await db();
  console.log(`server is running on port ${process.env.PORT}`);
});

