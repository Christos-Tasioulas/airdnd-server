const listingController = require('../web/ListingController.js')
const router = require('express').Router()

router.post('/addListing', listingController.addListing)
router.get('/searchListings', listingController.searchListings)
router.get('/getPlacesByLandlordId/:id', listingController.getPlacesByLandlordId) // get all owned places
router.get('/getBookedPlacesByLandlordId/:id', listingController.getBookedPlacesByLandlordId) // get all booked places
router.get('/getListingById/:id', listingController.getListingById)
router.get('/getAllUniqueSpaceTypes', listingController.getAllUniqueSpaceTypes)
router.get('/getMaxDailyPrice', listingController.getMaxDailyPrice)
router.put('/updateListing', listingController.updateListing)
router.put('/bookListing', listingController.bookListing)
router.delete('/deleteListing/:id', listingController.deleteListing)

module.exports = router