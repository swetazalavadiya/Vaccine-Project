const express = require('express')
const router = express.Router()
const {Register , login} = require('../controller/userController')

router.post('/register', Register  )
router.post('/login',  login )
module.exports = router