const { getbilling, addbilling, updatebilling, removebilling } = require('../controllers/billingController');

const router = require('express').Router();

// get all billing 
router.get('/billing-list', getbilling);


//add a billing 
router.post('/add-billing', addbilling);



//edit a billing 
router.put('/update-billing/:id', updatebilling);


// delete a billing 
router.delete('/delete-billing/:id', removebilling)

module.exports = router;