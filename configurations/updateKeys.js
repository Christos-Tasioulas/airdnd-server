const crypto = require('crypto');
const fs = require('fs');
const dotenv = require('dotenv');

// Access the JWT_SECRET_KEY and TOKEN_HEADER_KEY values
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

// Print the current values
console.log('Current JWT Secret Key:', jwtSecretKey);
console.log('Current Token Header Key:', tokenHeaderKey);

// Replace the JWT_SECRET_KEY and TOKEN_HEADER_KEY with a new value
const newJwtSecretKey = crypto.randomBytes(64).toString('hex');
const newTokenHeaderKey = crypto.randomBytes(32).toString('hex');

const updatedContent1 = fs.readFileSync('./configurations/ServerConfig.env', 'utf8').replace(jwtSecretKey, newJwtSecretKey);
fs.writeFileSync('./configurations/ServerConfig.env', updatedContent1, 'utf8');

const updatedContent2 = fs.readFileSync('./configurations/ServerConfig.env', 'utf8').replace(tokenHeaderKey, newTokenHeaderKey);
fs.writeFileSync('./configurations/ServerConfig.env', updatedContent2, 'utf8');