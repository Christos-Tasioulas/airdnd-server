const listingController = require('../web/ListingController.js')
const router = require('express').Router()

router.post('/addListing', listingController.addListing)

module.exports = router