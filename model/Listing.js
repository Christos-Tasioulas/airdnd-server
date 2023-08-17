module.exports = (sequelize, DataTypes) => {

    const Listing = sequelize.define("listing", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},
        photos: {type: DataTypes.STRING, allowNull: false}, // List URLs
        houseRules: {type: DataTypes.STRING, allowNull: true}, // List
        minimumLengthStay: {type: DataTypes.INTEGER, allowNull: false},
        checkIn: {type: DataTypes.DATEONLY, allowNull: false},
        checkOut: {type: DataTypes.DATEONLY, allowNull: false},
        maxGuests: {type: DataTypes.INTEGER, allowNull: false},
        bedsNumber: {type: DataTypes.INTEGER, allowNull: false},
        bathroomsNumber: {type: DataTypes.INTEGER, allowNull: false},
        bedroomsNumber: {type: DataTypes.INTEGER, allowNull: false},
        squareMeters: {type: DataTypes.FLOAT, allowNull: false},
        // filters:
        amenities: {type: DataTypes.STRING, allowNull: false}, // List // paroxes
        spaceType: {type: DataTypes.STRING, allowNull: false},
        minPrice: {type: DataTypes.INTEGER, allowNull: false},
        // 
        dailyPrice: {type: DataTypes.INTEGER, allowNull: false},
        map: {type: DataTypes.STRING, allowNull: false}, // URL
        country: {type: DataTypes.STRING, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
        neihbourhood: {type: DataTypes.STRING, allowNull: false},
        transit: {type: DataTypes.STRING, allowNull: false}, // List
        reviewCount: {type: DataTypes.INTEGER, allowNull: false},
        reviewAvg: {type: DataTypes.FLOAT, allowNull: false},
        hasLivingRoom: {type: DataTypes.BOOLEAN, allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: true},
        isBooked: {type: DataTypes.BOOLEAN, allowNull: true},
        userID: {type: DataTypes.INTEGER, allowNull: false},
    })

    return Listing
}


// 9. Susthma Sustasewn ===========
// AlreadyRentedHouses
// AlreadyRentedHousesReviews
// UserSearches
// UserSearchesDetailsClicked


// Bookings
// 