const { getbilling, addbilling, updatebilling, removebilling } = require('../controllers/billingController');

const router = require('express').Router();

const authenticate = require("../authenticate");

// get all billing 
router.get('/billing-list', getbilling);


//add a billing 
router.post('/add-billing', authenticate, addbilling);



//edit a billing 
router.put('/update-billing/:id', authenticate, updatebilling);


// delete a billing 
router.delete('/delete-billing/:id', authenticate, removebilling)

module.exports = router;