// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port      = 8080;
const server    = app.listen(port, listening);

function listening() {
    console.log(`running now localhost:${port}`);
}

// POST route
app.post('/add', addData);
function addData(req, res) {
    projectData['temp']     = req.body.temp;
    projectData['date']     = req.body.date;
    projectData['feel']     = req.body.content;
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
}
