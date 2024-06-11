const asynHandler = require("express-async-handler")
const User = require("../model/User")
const bcrypt = require("bcrypt")

exports.registerUser = asynHandler(async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hash })
    res.status(200).json({ message: "user register success" })
})

exports.loginUser = asynHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "email not found" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "password do not match" })
    }
    res.status(200).json({ message: "user login success" })
})