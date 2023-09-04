const userListingController = require('../web/UserListingController.js')
const router = require('express').Router()

router.post('/addUserListing', userListingController.addUserListing)
router.get('/getUserListing/:userId/:listingId', userListingController.getUserListing)
router.put('/incrementUserListing', userListingController.incrementUserListing)

module.exports = router