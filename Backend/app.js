const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const login = require("./api/login");
const extractor = require("./api/extractor");
const passport = require("passport");
const cors=require('cors')
const iplogger=require("./api/iplogger")

mongoose.connect(`mongodb+srv://admindb:${{secrets.keyID}}@cluster0.bz1lr.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors())
app.use(express.static(__dirname))


app.use("/ip",iplogger)
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
