const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op } = require("sequelize");
const Booking = db.bookings

const addBooking = async (req, res) => {
    try {
        await Booking.create({
            date: req.body.date,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            numGuests: req.body.numPeople,
            price: req.body.price,
            userId: req.body.userId,
            listingId: req.body.placeId
        });
    
        res.status(200).json({ message: "Booking created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
      }
}

module.exports = {
    addBooking
}