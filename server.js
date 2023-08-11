/* This is where the server app starts */

// Module requirements
const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express()

// Set up Global configuration access
dotenv.config({ path: './configurations/Config.env' });

const port = process.env.PORT
//const origin = `https://localhost:${port}`
//const corsOptions = {origin: origin}

/* Middleware used to read body requests */
app.use(cors(/*corsOptions*/))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const userRouter = require('./routes/userRoutes.js')
app.use('/user', userRouter)

// Template default routes for the app
app.get('/', (req,res) => {
    res.status(200).json({message: "Home Page"})
})

app.all('*', (req,res) => {
    res.status(404).json({message: "Page not found"})
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})