const express = require('express')
const router = express.Router()
const {Register , login} = require('../controller/userController')
const{createVaccineSlot,vaccineAvailability}=require('../controller/vaccineController')
router.post('/register', Register  )
router.post('/login',  login )

router.post('/createVaccineslot', createVaccineSlot)
router.get('/getSlots', vaccineAvailability)
module.exports = router