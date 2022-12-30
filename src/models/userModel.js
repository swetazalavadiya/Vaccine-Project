const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    Name :  String, 
    PhoneNumber : 
    { type :Number,
    required : true },
     Age : Number,
     Pincode : Number,
     AadharNo : String ,
     password :{ type :String,
     required : true }
}, {timestamps : true})

module.exports = mongoose.model('user', userSchema)
