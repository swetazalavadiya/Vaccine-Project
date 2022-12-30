const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    Name :  String, PhoneNumber : { type :Number, }, Age : Number, Pincode : Number, AadharNo : Number , password : String
}, {timestamps : true})

module.exports = mongoose.model('user', userSchema)
