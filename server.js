//call the other files we'll use
const express = require('express');
const htmlRoutes = require('./routes/html-routes.js');
const apiRoutes = require('./routes/api-routes.js');


//Define the port we'll use
const PORT = process.env.PORT || 3001;

//activate express
const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(htmlRoutes);
app.use(apiRoutes);

//Serve static files such as CSS and JS files
app.use(express.static('public'));


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);