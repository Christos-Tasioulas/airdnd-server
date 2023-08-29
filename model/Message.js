module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("message", {
        messageId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false}, 
        receiverUsername: {type: DataTypes.STRING, allowNull: false},
        senderUsername: {type: DataTypes.STRING, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
        messageText: {type: DataTypes.TEXT, allowNull: false},
    })

    return Message
}