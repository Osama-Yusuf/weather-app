// Setup empty JS object to act as endpoint for all routes with array method
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4500;
const server = app.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}`);
});

// Get All Data By The: http://localhost:4500/getAll
app.get("/getAll", (req, res) => {
  res.send(projectData);
  projectData = [];
});
// Post Data By The: http://localhost:4500/postData
// initialize post route
app.post("/add", (req, res) => {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  res.send(projectData);
});
