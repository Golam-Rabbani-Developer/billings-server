const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const { serverError, resourceError } = require('../errors/loginerror')



module.exports = {
    login(req, res) {
        let { email, password } = req.body.data;

        // fiding the existing user 
        User.findOne({ email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            return serverError(res, err)
                        }

                        if (!result) {
                            return resourceError(res, "Password Didn't Match")
                        }

                        res.status(200).json({
                            message: "User Logged In Successfully",
                        })

                    });
                } else {
                    return resourceError(res, "User Couldn't found")
                }
            })
            .catch(err => serverError(res, err))
    },

    register(req, res) {
        let { name, password, email, phone } = req.body.data;

        // finding the user existed in the database or not 
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    return resourceError(res, "Email is used for once only")
                } else {

                    //encrypting the plain password using bcrypt
                    bcrypt.hash(password, 11, (err, result) => {
                        if (err) {
                            return serverError(res, err)
                        }


                        //making a new user
                        let user = new User({
                            name,
                            email,
                            password: result,
                            phone
                        })

                        // saving the user in our database 
                        user.save()
                            .then(user => {
                                if (user) {

                                    let token = jwt.sign({
                                        _id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone,
                                    }, "SECRET", { expiresIn: '7d' })

                                    return res.status(201).json({
                                        message: "User Created Successfully",
                                        token: `Bearer ${token}`,
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                return serverError(res, err)
                            })
                    })
                }
            })
            .catch(error => {
                return serverError(res, error)
            })
    },


    userUpdate(req, res) {
        let data = req.body;
        let updatedUser = { ...req.user._doc }
        let user = {
            transaction: updatedUser.transaction,
            name: data.name,
            email: updatedUser.email,
            password: updatedUser.password,
            balance: updatedUser.balance,
            income: data.income,
            loans: updatedUser.loans,
            image: data.image,
            profession: data.profession,
            address: data.address,
        }
        User.findByIdAndUpdate(updatedUser._id, { $set: user }, { new: true })
            .then(user => {

                if (user) {
                    return res.status(201).json({
                        message: "User Created Successfully",
                        user
                    })
                }
            })
            .catch(err => serverError(res, err))
    },

    getAlluser(req, res) {
        User.find()
            .then(users => users.length > 0 && res.status(201).json({ users }))
            .catch(err => serverError(res, err))
    },

    removeUser(req, res) {
        const { id } = req.params;
        User.findById(id)
            .then(user => {
                return res.status(201).json({
                    user
                })
            })
            .catch(err => serverError(res, err))
    }
}