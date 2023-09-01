const bookingController = require('../web/BookingController.js')
const router = require('express').Router()

router.post('/addBooking', bookingController.addBooking)

module.exports = router