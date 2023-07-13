const userController = require('../web/UserController.js')
const router = require('express').Router()

router.post('/addUser', userController.addUser)
router.get('/getAllUsers', userController.getAllUsers)
router.get('/getUsersByUsername/:username', userController.getUsersByUsername)

module.exports = router