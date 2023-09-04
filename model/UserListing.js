module.exports = (sequelize, DataTypes) => {

    const UserListing = sequelize.define("userListing", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        visitCount: {type: DataTypes.INTEGER, allowNull: false},
    })

    return UserListing
}