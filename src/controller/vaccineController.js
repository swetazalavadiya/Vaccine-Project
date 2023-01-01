const vaccineModel = require("../models/vaccineModels")
const validator = require('../validator/validator')
const bcrypt = require("bcrypt")
const userModel = require('../models/userModel')


exports.createVaccineSlot = async (req, res) => {
    try {
        let data = req.body
        let { PhoneNumber, password, date, Dose, timeSlots, ...rest } = data

        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Body cannot be empty, please provide mandatory fields, i.e. date, totalVaccineAvailable, timeSlots, pincode" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "this field accepts only date, totalVaccineAvailable, timeSlots, pincode" })

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

        const vaccineAbilable = await vaccineModel.find({ date: Date.now(), timeSlots: timeSlots }, { _id: 1 })
        if (vaccineAbilable.length >= 10) return res.status(400).send({ status: false, msg: "slot is not availablefor booking slot" })

        data.Name = user.Name
        data.Age = user.Age
        data.AadharNo = user.AadharNo
        data.pincode = user.pincode

        if (user.Dose == "none") {
            if (Dose != user.Dose) return res.status(400).send({ status: false, msg: "please fill correct Dose" })
            user.Dose = "first"
        }
        if (user.Dose == "first") {
            if (Dose != user.Dose) return res.status(400).send({ status: false, msg: "please fill correct Dose" })
            user.Dose = "second"
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



exports.vaccineAbilvilty = async (_, res) => {
    try {

        const vaccine = await vaccineModel.find({ date: Date.now() }, { timeSlots: 1, Date: 1, _id: 0 })

        if (vaccine.length == 0) return res.status(404).send({ status: false, msg: "allTimeSlots avilavble" })

        let timeSlot = {}

        let abilable10001030 = vaccine.filter(a => { a.timeSlots == "10:00AM-10:30AM" })

        if (abilable10001030.length != 10) { timeSlot["10:00AM-10:30AM"] = "Available ", 10 - abilable10001030.length }

        let abilable10301100 = vaccine.filter(a => { a.timeSlots == "10:30AM-11:00AM" })

        if (abilable10301100.length != 10) { timeSlot["10:30AM-11:00AM"] = "Available ", 10 - abilable10301100.length }

        let abilable11001130 = vaccine.filter(a => { a.timeSlots == "11:00AM-11:30AM" })

        if (abilable11001130.length != 10) { timeSlot["11:00AM-11:30AM"] = "Available ", 10 - abilable11001130.length }

        let abilable11301200 = vaccine.filter(a => { a.timeSlots == "11:30AM-12:00AM" })

        if (abilable11301200.length != 10) { timeSlot["11:30AM-12:00AM"] = "Available ", 10 - abilable11301200.length }

        let abilable12001230 = vaccine.filter(a => { a.timeSlots == "12:00AM-12:30AM" })

        if (abilable12001230.length != 10) { timeSlot["12:00AM-12:30AM"] = "Available ", 10 - abilable12001230.length }

        let abilable12300100 = vaccine.filter(a => { a.timeSlots == "12:30AM-01:00AM" })

        if (abilable12300100.length != 10) { timeSlot["12:30AM-01:00AM"] = "Available ", 10 - abilable12300100.length }

        let abilable01000130 = vaccine.filter(a => { a.timeSlots == "01:00AM-01:30AM" })

        if (abilable01000130.length != 10) { timeSlot["01:00AM-01:30AM"] = "Available ", 10 - abilable01000130.length }

        let abilable01300200 = vaccine.filter(a => { a.timeSlots == "01:30AM-02:00AM" })

        if (abilable01300200.length != 10) { timeSlot["01:30AM-02:00AM"] = "Available ", 10 - abilable01300200.length }

        let abilable02000230 = vaccine.filter(a => { a.timeSlots == "02:00AM-02:30AM" })

        if (abilable02000230.length != 10) { timeSlot["02:00AM-02:30AM"] = "Available ", 10 - abilable02000230.length }

        let abilable02300300 = vaccine.filter(a => { a.timeSlots == "02:30AM-03:00AM" })

        if (abilable02300300.length != 10) { timeSlot["02:30AM-03:00AM"] = "Available ", 10 - abilable02300300.length }

        let abilable03000330 = vaccine.filter(a => { a.timeSlots == "03:00AM-03:30AM" })

        if (abilable03000330.length != 10) { timeSlot["03:00AM-03:30AM"] = "Available ", 10 - abilable03000330.length }

        let abilable03300400 = vaccine.filter(a => { a.timeSlots == "03:30AM-04:00AM" })

        if (abilable03300400.length != 10) { timeSlot["03:30AM-04:00AM"] = "Available ", 10 - abilable03300400.length }

        let abilable04000430 = vaccine.filter(a => { a.timeSlots == "04:00AM-04:30AM" })

        if (abilable04000430.length != 10) { timeSlot["04:00AM-04:30AM"] = "Available ", 10 - abilable04000430.length }

        let abilable04300500 = vaccine.filter(a => { a.timeSlots == "04:30AM-05:00AM" })

        if (abilable04300500.length != 10) { timeSlot["04:00AM-04:30AM"] = "Available ", 10 - abilable04300500.length }


        return res.status(200).send({ status: true, msg: "success", Data: timeSlot })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}