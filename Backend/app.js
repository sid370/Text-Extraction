const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const login = require("./api/login");
const extractor = require("./api/extractor");
const passport = require("passport");
const cors=require('cors')

mongoose.connect(
  "Mongo URL",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", " 3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  next();
});

app.use("/auth", login);
app.use("/text", extractor);
app.use("/download", express.static("download"));

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

module.exports = app;
