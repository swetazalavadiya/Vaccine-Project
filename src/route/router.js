const express = require('express')
const router = express.Router()
const userCont = require('../controller/userController')

router.post('/resterUser', userCont )