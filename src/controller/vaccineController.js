const vaccineModel = require("../models/vaccineModels")
const validator = require('../validator/validator')
const bcrypt = require("bcrypt")
const userModel = require('../models/userModel')


const createVaccineSlot = async (req, res) => {
    try {
        let data = req.body
        let { PhoneNumber, password, date, Dose, timeSlots, ...rest } = data

        if (!validator.isValid(data)) return res.status(400).send({ status: false, message: "Body cannot be empty, please provide mandatory fields, i.e. date, totalVaccineAvailable, timeSlots, pincode" });
        if (validator.isValid(rest)) return res.status(400).send({ status: false, message: "this field accepts only date, totalVaccineAvailable, timeSlots, pincode" })

        if (!date) return res.status(400).send({ status: false, msg: "date is not present" })
        if (!validator.isValidDate(date)) return res.status(400).send({ status: false, message: "Date should be in YYYY-MM-DD format" })

        if (!PhoneNumber) return res.status(400).send({ status: false, message: "please provide  phonenumber " })
        if (!isValidPhone(PhoneNumber)) return res.status(400).send({ status: false, message: "please provide phonenumber" })

        if (!password) return res.status(400).send({ status: false, message: "please provide password" })
        if (!isValid(password)) return res.status(400).send({ status: false, message: "please provide valid password" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide password " })

        const user = await userModel.findOne({ PhoneNumber: PhoneNumber })
        if (!user) return res.status(404).send({ status: false, data: "user is not present" })
        password = await bcrypt.compare(password, user.password)
        if (!password) return res.status(400).send({ status: false, msg: "password is not matching" })

        const vaccineAvailable = await vaccineModel.find({ date: Date.now(), timeSlots: timeSlots }, { _id: 1 })
        if (vaccineAvailable.length >= 10) return res.status(400).send({ status: false, msg: "slot is not availablefor booking slot" })

        data.Name = user.Name
        data.Age = user.Age
        data.AadharNo = user.AadharNo
        data.pincode = user.pincode

        if (user.Dose == "none") {
            if (Dose != user.Dose) return res.status(400).send({ status: false, msg: "please fill correct Dose" })
            data.Dose = "first"
        }
        if (user.Dose == "first") {
            if (Dose != user.Dose) return res.status(400).send({ status: false, msg: "please fill correct Dose" })
            data.Dose = "second"
        }
        if(user.Dose=="second"){
            return res.status(400).send({status:false,msg:"you complited your Dose"})
        }

        let vaccineData = await vaccineModel.create(data)
        return res.status(201).send({ status: true, message: "successful", data: vaccineData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const vaccineAvailability = async (req, res) => {
    try {

        const vaccine = await vaccineModel.find({ date: Date.now() }, { timeSlots: 1, Date: 1, _id: 0 })
        if (vaccine.length == 0) return res.status(404).send({ status: false, msg: "allTimeSlots avilavble" })

        let timeSlot = {}

        let available10001030 = vaccine.filter(a => { a.timeSlots == "10:00AM-10:30AM" })
        if (available10001030.length != 10) { timeSlot["10:00AM-10:30AM"] = "Available ", 10 - available10001030.length }

        let available10301100 = vaccine.filter(a => { a.timeSlots == "10:30AM-11:00AM" })
        if (available10301100.length != 10) { timeSlot["10:30AM-11:00AM"] = "Available ", 10 - available10301100.length }

        let available11001130 = vaccine.filter(a => { a.timeSlots == "11:00AM-11:30AM" })
        if (available11001130.length != 10) { timeSlot["11:00AM-11:30AM"] = "Available ", 10 - available11001130.length }

        let available11301200 = vaccine.filter(a => { a.timeSlots == "11:30AM-12:00AM" })
        if (available11301200.length != 10) { timeSlot["11:30AM-12:00AM"] = "Available ", 10 - available11301200.length }

        let available12001230 = vaccine.filter(a => { a.timeSlots == "12:00AM-12:30AM" })
        if (available12001230.length != 10) { timeSlot["12:00AM-12:30AM"] = "Available ", 10 - available12001230.length }

        let available12300100 = vaccine.filter(a => { a.timeSlots == "12:30AM-01:00AM" })
        if (available12300100.length != 10) { timeSlot["12:30AM-01:00AM"] = "Available ", 10 - available12300100.length }

        let available01000130 = vaccine.filter(a => { a.timeSlots == "01:00AM-01:30AM" })
        if (available01000130.length != 10) { timeSlot["01:00AM-01:30AM"] = "Available ", 10 - available01000130.length }

        let available01300200 = vaccine.filter(a => { a.timeSlots == "01:30AM-02:00AM" })
        if (available01300200.length != 10) { timeSlot["01:30AM-02:00AM"] = "Available ", 10 - available01300200.length }

        let available02000230 = vaccine.filter(a => { a.timeSlots == "02:00AM-02:30AM" })
        if (available02000230.length != 10) { timeSlot["02:00AM-02:30AM"] = "Available ", 10 - available02000230.length }

        let available02300300 = vaccine.filter(a => { a.timeSlots == "02:30AM-03:00AM" })
        if (available02300300.length != 10) { timeSlot["02:30AM-03:00AM"] = "Available ", 10 - available02300300.length }

        let available03000330 = vaccine.filter(a => { a.timeSlots == "03:00AM-03:30AM" })
        if (available03000330.length != 10) { timeSlot["03:00AM-03:30AM"] = "Available ", 10 - available03000330.length }

        let available03300400 = vaccine.filter(a => { a.timeSlots == "03:30AM-04:00AM" })
        if (available03300400.length != 10) { timeSlot["03:30AM-04:00AM"] = "Available ", 10 - available03300400.length }

        let available04000430 = vaccine.filter(a => { a.timeSlots == "04:00AM-04:30AM" })
        if (available04000430.length != 10) { timeSlot["04:00AM-04:30AM"] = "Available ", 10 - available04000430.length }

        let available04300500 = vaccine.filter(a => { a.timeSlots == "04:30AM-05:00AM" })
        if (available04300500.length != 10) { timeSlot["04:00AM-04:30AM"] = "Available ", 10 - available04300500.length }

        return res.status(200).send({ status: true, msg: "success", Data: timeSlot })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createVaccineSlot=createVaccineSlot
module.exports.vaccineAvailability=vaccineAvailability