const userSearchController = require('../web/UserSearchController.js')
const router = require('express').Router()

router.post('/addUserSearch', userSearchController.addUserSearch)

module.exports = router