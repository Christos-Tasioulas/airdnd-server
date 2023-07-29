/**
 * This includes all the configurations needed to connect the application with the database.
 * Feel free to change the username and password as desired.
 */
module.exports= {
    host: "localhost",
    user: "root",
    password: "root",
    db: "air_dnd_db",
    dialect: "mysql", // We are using MySQL database
    pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
}