const express = require('express');
require('dotenv').config();

// Create express server
const app = express();


// Public directory
app.use( express.static('public') );


// Routes
// app.get('/', (req, res)=>(
//     res.json({
//         ok: true
//     })
// ));

// Listen
// Test port
app.listen( process.env.PORT, () => (
    console.log(`Server running in port ${ process.env.PORT }`)
) )