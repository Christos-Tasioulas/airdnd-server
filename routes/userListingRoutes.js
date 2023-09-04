const userListingController = require('../web/UserListingController.js')
const router = require('express').Router()

router.post('/addUserListing', userListingController.addUserListing)

module.exports = router