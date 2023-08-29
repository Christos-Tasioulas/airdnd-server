const messageController = require('../web/MessageController.js')
const router = require('express').Router()

router.post('/addMessage', messageController.addMessage)
router.get('/getMessagesByUser/:id', messageController.getMessagesByUser)
router.get('/getMessageById/:id', messageController.getMessageById)

module.exports = router