module.exports = (sequelize, DataTypes) => {

    const UserListing = sequelize.define("userlistings", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        visitCount: {type: DataTypes.INTEGER, allowNull: false} // how many times the user has visited/clicked-on this listing
    })

    return UserListing
}