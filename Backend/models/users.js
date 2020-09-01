const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    _id: String,
    email: { type: String, unique: true, match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ },
    name: { type: String },
    phone: { type: String, unique: true },
    password: { type: String },
    username: { type: String, unique: true },
    address: { type: String },
    gender: { type: String }
})

module.exports=mongoose.model('Users',UserSchema)