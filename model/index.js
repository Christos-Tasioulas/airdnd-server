const databaseConfig = require('../DatabaseConfig.js')
const {Sequelize, DataTypes} = require('sequelize')

/**
 * We initialize the database using Sequelize
 */
const sequelize = new Sequelize(
    databaseConfig.db,
    databaseConfig.user,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        pool: {
            max: databaseConfig.max,
            min: databaseConfig.min,
            acquire: databaseConfig.acquire,
            idle: databaseConfig.idle
        }
    }
)

// Authenticating the database
sequelize.authenticate().then(() => {
    console.log("Connected")
}).catch(error => {
    console.log("Error: ", error)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Adding a users table inside the database
db.users = require('./User.js')(sequelize, DataTypes)

/* Command that allows us to re-sync the database with the server whenever a change
 * is made to the code or the database 
 */ 
db.sequelize.sync({force: false}).then(() => {
    console.log("Re-sync done")
})

module.exports = db