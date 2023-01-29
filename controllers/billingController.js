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
        const page = req.query.page;
        const limit = 10;
        Billing.find()
            .then(allbillings => {
                if (allbillings) {
                    const datalength = allbillings.length;
                    let total = 0;
                    for (i = 0; i < allbillings.length; i++) {
                        total += allbillings[i].amount;
                    }
                    if (datalength < 10) {
                        return res.status(200).json({
                            allbillings,
                            total,
                            datalength
                        })
                    } else {
                        Billing.find()
                            .limit(limit)
                            .skip(Number(page) * limit)
                            .then(billings => {
                                return res.status(200).json({
                                    billings,
                                    total,
                                    datalength
                                })
                            })
                    }

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