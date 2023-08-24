const listingController = require('../web/ListingController.js')
const router = require('express').Router()

router.post('/addListing', listingController.addListing)
router.get('/searchListings', listingController.searchListings)
router.get('/getPlacesByLandlordId/:id', listingController.getPlacesByLandlordId)
router.get('/getListingById/:id', listingController.getListingById)
router.put('/updateListing', listingController.updateListing)
router.delete('/deleteListing/:id', listingController.deleteListing)

module.exports = router