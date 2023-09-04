const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const UserSearch = db.userSearch
// const Review = db.reviews

// Request using POST method that adds a listing to the database
// const addListing = async (req, res) => {

const addUserSearch = async (req, res) => {
    try {
        await UserSearch.create({
            userId: req.body.userId,
            country: req.body.country,
            city: req.body.city,
            neighborhood: req.body.country,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            maxGuests: req.body.country,
        });

        res.status(200).json({ message: "Booking created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
    }
}

module.exports = {
    addUserSearch,
}