const express = require("express")
const { default : mongoose } = require("mongoose")
const route = require('./route/router')

const app = express()

app.use(express.json())
mongoose.set({'strictQuery' : true})
mongoose.connect('mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/test',)
.then(()=> console.log("mongodb is connected"))
.catch((err)=> console.log(err))

//app.use('/', route)

app.listen(3000, function(){
    console.log("server is started in  port 3000")
})