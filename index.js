const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use( cors() );

// Public directory
app.use( express.static('public') );

// Parsing body
app.use( express.json() );

// Routes
// AUTH
app.use('/api/auth', require('./routes/auth'));
//CRUD



// Listen
app.listen( process.env.PORT, () => (
    console.log(`Server running in port ${ process.env.PORT }`)
));