const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        require: true
     } ,
    PhoneNumber: {
        type: Number,
        required: true,
        unique:true
    },
    Age: {
        type:Number,
        require:true
    },
    Dose:{
        type:String,
        enum:["none","first","second"],
        require:true
        },
    Pincode: {
        type: Number,
        require:true
    },
    AadharNo:{
        type: String,
         require:true,
         unique:true
        },
    Password: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)
