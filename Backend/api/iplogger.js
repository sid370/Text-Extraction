const express=require("express")
const Router=express.Router()
const mongoose=require("mongoose")
const ipl=require("../models/iplog")

Router.post("/",(req,res,next)=>{
    ipl.find({ip: req.body.ip})
    .exec()
    .then((resp)=>{
        if (resp.length>1){
            res.send({
                message: "found"
            })
        }
    })
})

module.exports=Router