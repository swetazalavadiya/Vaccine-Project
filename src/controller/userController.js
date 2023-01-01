const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")



//====================================================resisterUser=======================================

const Register = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data" })

        let { Name, PhoneNumber, Age, Pincode, Dose, AadharNo, Password } = data

        if (!PhoneNumber) return res.status(400).send({ status: false, message: "please provide  phonenumber " })
        if (!isValidPhone(PhoneNumber)) return res.status(400).send({ status: false, message: "please provide phonenumber" })

        if (!Password) return res.status(400).send({ status: false, message: "please provide password" })
        if (!isValid(Password)) return res.status(400).send({ status: false, message: "please provide valid password" })
        if (!isValidPassword(Password)) return res.status(400).send({ status: false, message: "please provide password " })
        Password = await bcrypt.hashSync(Password, 10)

        if (!Name) return res.status(400).send({ status: false, message: "please provide name" })
        if (!isValid(Name)) return res.status(400).send({ status: false, message: "please provide valid name..." })
        if (!isValidName(Name)) return res.status(400).send({ status: false, message: "please provide name" })

        if (!isValidNumber(Age)) return res.status(400).send({ status: false, message: "please provide Age " })

        if (!Pincode) return res.status(400).send({ status: false, message: "please provide pinCode" })
        if (!isValidPincode(Pincode)) return res.status(400).send({ status: false, message: "please provide Pincode " })

        if (!AadharNo) return res.status(400).send({ status: false, message: "please provide AadharNo" })
        if (!isValid(AadharNo)) return res.status(400).send({ status: false, message: "please provide valid AadharNo..." })
        if (!isValidAadhar(AadharNo)) return res.status(400).send({ status: false, message: "please provide AadharNo... " })

        if (!Dose) return res.status(400).send({ status: false, msg: "Dose is not avilable" })
        if (!["none", "first", "second"].includes(Dose)) return res.status(400).send({ status: false, msg: "Dose can be only none/first/second" })

        let user = await userModel.create(data)

        return res.status(201).send({ status: true, message: "Success", data: user })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: `server err : ${err.message}` })
    }
}


//================================================loginUser=================================================================

const login = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data" })

        let { PhoneNumber, password } = data
        if (!PhoneNumber) return res.status(400).send({ status: false, message: "please provide  PhoneNumber " })
        if (!password) return res.status(400).send({ status: false, message: "please provide  password " })

        if (!isValidPhone(PhoneNumber)) return res.status(400).send({ status: false, message: "please provide  valid PhoneNumber " })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide  valid  password " })

        let user = await userModel.findOne({ PhoneNumber: PhoneNumber, })
        if (!user) return res.status(404).send({ status: false, message: "user is not present" })
        password = await bcrypt.compare(password, user.password)
        if (!password) return res.status(400).send({ status: false, msg: "password is not matching" })
        
        const token = jwt.sign({ PhoneNumber: user.PhoneNumber, password: user.password }, "Covid-project", { expiresIn: "24h" })

        return res.status(200).send({ status: true, msg: "user login successfully", token: token })

    } catch (err) {
        return res.status(500).send({ status: false, message: `server err : ${err.message}` })
    }
}




module.exports = { Register, login }