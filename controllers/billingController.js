const { serverError } = require('../errors/loginerror');
const Billing = require('../models/Billings');



module.exports = {

    // add a new billing 
    addbilling(req, res) {
        const { email, amount, name, phone } = req.body.data;

        const billing = new Billing({
            email,
            phone,
            amount,
            name
        })

        billing.save()
            .then(billing => {
                if (billing) {
                    return res.status(200).json({
                        billing,
                        message: 'Billings Added'
                    })
                }
            })
            .catch(err => serverError(res, err))

    },

    // get all billing according to email
    getbilling(req, res) {

        Billing.find()
            .then(billings => {
                if (billings) {
                    let total = 0;
                    for (i = 0; i < billings.length; i++) {
                        total += billings[i].amount;
                    }
                    
                    return res.status(200).json({
                        billings,
                        total
                    })
                } else {
                    return res.status(200).json({
                        message: 'No Billings Found'
                    })
                }

            })
            .catch(err => serverError(res, err))
    },

    // update an existing billing 
    updatebilling(req, res) {
        const { id } = req.params;

        Billing.findByIdAndUpdate(id, { $set: req.body.data }, { new: true })
            .then(billing => {
                return res.status(200).json({
                    billing
                })
            })
            .catch(err => serverError(res, err))
    },

    // deleting a billing 
    removebilling(req, res) {
        const { id } = req.params;
        Billing.findByIdAndDelete(id)
            .then(data => {
                return res.status(200).json({
                    message: "Deleted Successfully"
                })
            })
            .catch(err => serverError(res, err))
    }

}