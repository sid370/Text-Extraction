const mongoose=require('mongoose')

const ipl=mongoose.Schema({
    _id:String,
    ip: String,
    num: Number
})

module.exports=mongoose.model('iplog',ipl)