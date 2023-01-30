
const router = require('express').Router()


const { register, login } = require('../controllers/usercontroller');
const authenticate = require("../authenticate")

// registration route
router.post('/registration', register)


// login route 
router.post('/login', login)


module.exports = router;

