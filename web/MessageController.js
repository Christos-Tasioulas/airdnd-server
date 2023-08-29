const { sequelize } = require('sequelize');
const db = require('../model')
const { Op } = require("sequelize");
const Message = db.messages

// Request using POST method that adds a message to the database
const addMessage = async (req, res) => {
    try {
      await Message.create({
        messageId:  req.body.messageId,
        receiverId: req.body.receiverId, // foreign key
        userId: req.body.userId, // foreign key
        receiverUsername: req.body.receiverUsername,
        senderUsername: req.body.senderUsername,
        date: req.body.date,
        messageText: req.body.messageText
      });
  
      res.status(200).json({ message: "Message created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create message" });
    }
};

const getMessageById = async (req, res) => {
  const id = req.params.id

  try {
    const message = await Message.findOne({
      where: {messageId: id},
    });
    res.status(200).json({message: message});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve messages by Id" });
  }
}

const getMessagesByUser = async (req, res) => {
  const id = req.params.id

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ userId: id }, { receiverId: id }],
      },
    });
    res.status(200).json({message: messages});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve messages by User" });
  }
}

module.exports = {
    addMessage,
    getMessagesByUser,
    getMessageById
}