const userListingParamsController = require('../web/UserListingParamsController.js')
const router = require('express').Router()

router.post('/createMatrixValues', userListingParamsController.createMatrixValues)
router.delete('/deleteMatrixValues', userListingParamsController.deleteMatrixValues)

module.exports = router