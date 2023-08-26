/* This is where the server app starts */

// Module requirements
const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv');
const https = require("https")
const http = require("http")
const path = require("path")
const fs = require("fs")

const app = express()

const httpsServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 
            "certificates", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname,
            "certificates", "cert.pem")),
    },
    app
)

// Set up Global configuration access
dotenv.config({ path: './configurations/Config.env' });

const port = process.env.PORT
const host = process.env.HOST
// Define the allowed origins
const allowedOrigins = [
    'https://localhost:3000'
];

// Configure CORS with allowed origins
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
};

/* Middleware used to read body requests */
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// User Routes
const userRouter = require('./routes/userRoutes.js')
app.use('/user', userRouter)

// Listing Routes
const listingRoutes = require('./routes/listingRoutes.js')
app.use('/listing', listingRoutes)

// Review Routes
const reviewRoutes = require('./routes/reviewRoutes.js')
app.use('/review', reviewRoutes)

// Update Key Request
const { updateKeys } = require('./configurations/updateKeys.js')
app.post('/updateKeys', updateKeys);

// Template default routes for the app
app.get('/', (req,res) => {
    res.status(200).json({message: "Home Page"})
})

app.all('*', (req,res) => {
    res.status(404).json({message: "Page not found"})
})

httpsServer.listen(port, host, () => {
    console.log(`Server listening on port ${host}:${port}...`)
})