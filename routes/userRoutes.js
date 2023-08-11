const userController = require('../web/UserController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the user table is concerned

router.post('/addUser', userController.addUser)
router.post('/generateToken', userController.generateToken)
router.get('/getAllUsers', userController.getAllUsers)
router.get('/getUsersByUsername/:username', userController.getUsersByUsername)
router.get('/getUserById/:id', userController.getUserById)
router.get('/validateToken', userController.validateToken)
router.put('/approveUser', userController.approveUser)
router.put('/updateUser', userController.updateUser)


module.exports = router