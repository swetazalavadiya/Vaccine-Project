const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        require: true
     } ,
    PhoneNumber: {
        type: Number,
        required: true,
        // unique:true
    },
    Age: Number,

    Pincode: {
        type: Number,
        require:true
    },
    AadharNo:{
        type: String,
         require:true,
        //  unique:true
        },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)
