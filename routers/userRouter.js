
const router = require('express').Router()


const { register, login, userUpdate, getAlluser, removeUser } = require('../controllers/usercontroller');
const authenticate = require("../authenticate")

// registration route 
router.post('/registration', register)


// login route 
router.post('/login', login)

//update a user
router.put('/userupdate', authenticate, userUpdate)


router.get('/allusers', authenticate, getAlluser)


router.delete('/deleteuser/:id', authenticate, removeUser)

module.exports = router;

