const express = require("express")
const app = express()
const mongoose = require("mongoose")
const textextractor=require("../models/textextractor")
const multer=require("multer")
let success=false
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,req.originalName)
    }
})
const fileFilter=(req,file,cb)=>{
    if (file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        success=true
        cb(null,true)
    }
    else
        cb(null,false)
}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
})

exports.extraction=(req,res,next)=>{

}

