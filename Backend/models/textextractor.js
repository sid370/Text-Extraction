const mongoose=require('mongoose')

const textext=mongoose.Schema({
    _id:String,
    client:{type:String},
    link:{type:String}
})

module.exports=mongoose.model('textextractor',textext)