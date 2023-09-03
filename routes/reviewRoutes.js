const reviewController = require('../web/ReviewController.js')
const router = require('express').Router()

router.post('/addReview', reviewController.addReview)
router.get('/getReviewsByListingId/:id', reviewController.getReviewsByListingId)
router.get('/getReviewsByLandlordId/:id', reviewController.getReviewsByLandlordId)
router.get('/countReviewsByLandlordId/:id', reviewController.countReviewsByLandlordId)

module.exports = router