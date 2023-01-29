const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const billingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})

const Billing = mongoose.model('Billing', billingSchema)

module.exports = Billing;