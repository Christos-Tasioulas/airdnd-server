const userController = require('../web/UserController.js')
const router = require('express').Router()

router.post('/addUser', userController.addUser)
router.get('/getAllUsers', userController.getAllUsers)
router.get('/getUsersByUsername/:username', userController.getUsersByUsername)
router.get('/getUserById/:id', userController.getUserById)

module.exports = router