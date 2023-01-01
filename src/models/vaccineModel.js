const mongoose = require('mongoose');

const vaccineSlots = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    Age: {
        type: Number,
        require: true
    },
    AadharNo: {
        type: String,
        require: true,
        unique: true
    },
    Date: {
        type: String,
        required: true
    },
    Dose: {
        type: String,
        enum: ["first", "second"],
        require: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    timeSlots: [{
        "10:00AM-10:30AM": { type: String, enum: ["Available", "Unavailable"] },
        "10:30AM-11:00AM": { type: String, enum: ["Available", "Unavailable"] },
        "11:00AM-11:30AM": { type: String, enum: ["Available", "Unavailable"] },
        "11:30AM-12:00PM": { type: String, enum: ["Available", "Unavailable"] },
        "01:00PM-01:30PM": { type: String, enum: ["Available", "Unavailable"] },
        "01:30PM-02:00PM": { type: String, enum: ["Available", "Unavailable"] },
        "02:00PM-02:30PM": { type: String, enum: ["Available", "Unavailable"] },
        "02:30PM-03:00PM": { type: String, enum: ["Available", "Unavailable"] },
        "03:00PM-03:30PM": { type: String, enum: ["Available", "Unavailable"] },
        "03:30PM-04:00PM": { type: String, enum: ["Available", "Unavailable"] },
        "04:00PM-04:30PM": { type: String, enum: ["Available", "Unavailable"] },
        "04:30PM-05:00PM": { type: String, enum: ["Available", "Unavailable"] }
    }]
})

module.exports = mongoose.model('vaccineSlots', vaccineSlots)