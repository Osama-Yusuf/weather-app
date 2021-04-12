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
app.get("/getAll", (req, res) => {
  res.send(projectData);
});

projectData = [];
// post all data with post route
app.post("/addDataa", (req, res) => {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  // updating the ui by pushing the project data to new entry 
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
});
