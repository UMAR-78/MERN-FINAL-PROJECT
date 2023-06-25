const express = require('express')
// const router = require('./productRoute')
const { RegisterUser } = require('../controllers/userController')
const router = express.Router()



router.route('/register').post(RegisterUser)



module.exports = router