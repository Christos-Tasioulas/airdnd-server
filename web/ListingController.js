const { sequelize } = require('sequelize');
const db = require('../model')
// const ms = require('ms');
const Listing = db.listings

// Request using POST method that adds a listing to the database
const addListing = async (req, res) => {
    console.log(req.body);
    try {
      await Listing.create({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        photos: req.body.photos,
        houseRules: req.body.houseRules,
        minimumLengthStay: req.body.minimumLengthStay,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        maxGuests: req.body.maxGuests,
        bedsNumber:req.body.bedsNumber,
        bathroomsNumber: req.body.bathroomsNumber,
        bedroomsNumber: req.body.bedroomsNumber,
        squareMeters: req.body.squareMeters,
        amenities: req.body.amenities,
        spaceType: req.body.spaceType,
        minPrice: req.body.minPrice,
        dailyPrice: req.body.dailyPrice,
        map: req.body.map, 
        country: req.body.country,
        city: req.body.city,
        neihbourhood: req.body.neihbourhood,
        transit: req.body.transit,
        reviewCount: req.body.reviewCount,
        reviewAvg: req.body.reviewAvg,
        hasLivingRoom: req.body.hasLivingRoom,
        description: req.body.description,
        isBooked: req.body.isBooked,
        userId: req.body.userId,
      });
  
      res.status(200).json({ message: "Listing created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  };

module.exports = {
    addListing
}