const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

let isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
}

let isValidPassword=function(password){
    let passwordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    return passwordRegex.test(password)
}

let isValidName = function(name){
    let nameregex = /^[a-zA-Z\. ]*$/
    return nameregex.test(name)
}

const isValid = function (value) {
    if (typeof value !== "string") return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const validAddar = function(abc){
    let sample = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/
    return sample.test(abc)
}
let isValidNumber = (age) => {
    return /\d/.test(age)
}

let isValidPincode = (num) => {
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(num);
}

const Register = async (req, res)=> {
    try{
        let data = req.body
        if(Object.keys(data).length == 0) return res.status(400).send({status : false , message : "please provide data"})

        let { Name , PhoneNumber , Age , Pincode ,AadharNo , password  } = data 

        if(!PhoneNumber) return res.status(400).send({status : false , message : "please provide  phonenumber "})
        if(!isValidPhone(PhoneNumber)) return res.status(400).send({status : false , message : "please provide phonenumber"})
        if(!password) return res.status(400).send({status : false , message : "please provide password"})
        if(!isValidName(Name)) return res.status(400).send({status : false , message : "please provide name"}) 
        if(!isValidPassword(password)) return res.status(400).send({status : false , message : "please provide password "}) 
        if(!isValidNumber(Age))  return res.status(400).send({status : false , message : "please provide Age "}) 
        if(!isValidPincode(Pincode))  return res.status(400).send({status : false , message : "please provide Pincode "}) 
        if(!validAddar(AadharNo)) return res.status(400).send({status : false , message : "please provide AddarNo "}) 
        let user = await userModel.create(data)
        return res.status(201).send({status : true,  message : "Success" , data : user})
    }catch(err){
        return res.status(500).send({ status : false , message : `server err : ${err}`})
    }
}



const login = async (req,res)=>{
    try{
        let data = req.body
        if(Object.keys(data).length == 0) return res.status(400).send({status : false , message : "please provide data"})
     
        let { PhoneNumber , password} = data
        if(!PhoneNumber) return res.status(400).send({status : false , message : "please provide  PhoneNumber "})
        if(!password) return res.status(400).send({status : false , message : "please provide  password "})

        if(!isValidPhone(PhoneNumber))  return res.status(400).send({status : false , message : "please provide  valid PhoneNumber "})
        if(!isValidPassword(password)) return res.status(400).send({status : false , message : "please provide  valid  password "})

        let user = await userModel.findOne({PhoneNumber : PhoneNumber}) 

        const userId = user._id.toString()
        const token = jwt.sign( {PhoneNumber : user.PhoneNumber , password : user.password}, "Covid-project", {expiresIn: "60m"})

        return res.status(200).send({ status: true, msg: "user login successfully",  token: token })
    
    }catch(err){
        return res.status(500).send({ status : false , message : `server err : ${err}`}) 
    }
}
module.exports = { Register ,login}

