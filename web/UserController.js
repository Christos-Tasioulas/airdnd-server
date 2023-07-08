const db = require('../model')

const User = db.users

const addUser = async (req,res) => {

    User.create({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image
    })

    res.status(200).json({message: "Successfully created"})
}

const getAllUsers = async (req,res) => {
    let users = await User.findAll()
    res.status(200).json({message: users})
}

module.exports = {
    addUser,
    getAllUsers
}