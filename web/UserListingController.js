const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const UserListing = db.userListings
// const Review = db.reviews

// Request using POST method that adds a listing to the database
const addUserListing = async (req, res) => {

    try {
      await Listing.create({
        userId: req.body.userId,
        listingId: req.body.listingId,
        visitCount: req.body.visitCount
      });

      res.status(200).json({ message: "Listing created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  };

module.exports = {
    addUserListing,
}