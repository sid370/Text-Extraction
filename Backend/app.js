const express=require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app=express()
const mongoose=require("mongoose")
const login=require('./api/login')

mongoose.connect('mongodb+srv://admindb:uU7kBCUgMZWt6EXO@cluster0.bz1lr.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/auth",login)

app.use((req,res,next)=>{
    res.status(404).json({
        status:404,
        message:"Page not found"
    })
})

module.exports=app