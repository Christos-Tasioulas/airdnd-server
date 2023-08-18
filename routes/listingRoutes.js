const listingController = require('../web/ListingController.js')
const router = require('express').Router()

router.post('/addListing', listingController.addListing)
router.get('/searchListings/:country/:city/:neighborhood/:checkIn/:checkOut/:numPeople', listingController.searchListings)

module.exports = router