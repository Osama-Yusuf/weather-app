// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Setup Server
const port = 4500;
const server = app.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}`);
});

// get all data with get route
app.get("/getAllData", (req, res) => {
  res.send(projectData);
});

let projectData = {};
// post all data with post route
app.post("/addDataa", (req, res) => {
  console.log(req.body);
  newEntry = {
    currentDate: req.body.date,
    temperature: req.body.temp,
    feelsContent: req.body.content,
  };
  // updating the ui by assigning the new entry to project data.
  projectData = newEntry;
  res.send(projectData);
  console.log(projectData);
});
