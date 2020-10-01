const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const textextractor = require("../models/textextractor");
const multer = require("multer");
const ocrSpaceApi=require("ocr-space-api")
const fs=require('fs');
const { strict } = require("assert");
const checkauth=require('../middleware/checkauth')

let success = false;
let imageFilePath = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file.path)
    imageFilePath=file.originalname
    cb(null,file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    success = true;
    cb(null, true);
  } else cb(null, false);
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

var options = {
    apikey: "c67b7bcd3288957",
    imageFormat: "image/jpg",
    isOverlayRequired: true,
  };

  //d30ea9a1a788957
  //c67b7bcd3288957
Router.post("/upload",checkauth,upload.single("image"),(req,res,next)=>{
    console.log(req.file)
    if (success){
        success=false
        ocrSpaceApi.parseImageFromLocalFile("./uploads/"+imageFilePath,options)
        .then(function(parsedResult){
            console.log("Parse Successful")
            return (parsedResult.parsedText)
        })
        .then((e)=>{
            fs.writeFile("./download/"+imageFilePath.split('.')[0]+".txt",e,(err)=>{
                if (err)
                    res.status(500).json({
                        status:500,
                        message:"Download aborted. Please retry"
                    })
                else
                    res.status(200).json({
                        status:200,
                        message:"File created successfully",
                        link:"http://localhost:3000/download/"+imageFilePath.split('.')[0]+".txt"
                    })
            })
        })
    }
    else
        res.status(500).json({
            status:500,
            message:"File Not Uploaded. Please Retry"
        })
});

Router.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});

module.exports = Router;