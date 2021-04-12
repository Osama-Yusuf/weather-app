/* Global Variables */
const apiKey = "&appid=00a2b98be789445b22f97b08e4088258&units=imperial";
let apiURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";

const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");
// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event Listener to add function to existing html dom element
document.querySelector("#generate").addEventListener("click", (e) => {
  const zipCodeElement = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  if (!zipCodeElement) {
    return alert("You Didn't Enter Zip Code");
  }

  getWeather(apiURL, zipCodeElement, apiKey).then(function (data) {
    postData("/add", {
      date: newDate,
      temp: data.list[0].main.temp,
      content: feelings,
    });
    updateUI();
  });
});

// function to get web api data
const getWeather = async (apiURL, zip, key) => {
  const res = await fetch(apiURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function to post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// to get project data
const updateUI = async () => {
  const request = await fetch("/getAll");

  try {
    const allData = await request.json();
    dateElement.innerHTML = `Date: ${allData[0].date}`;
    tempElement.innerHTML = `Temperature: ${allData[0].temp} &#176C`;
    contentElement.innerHTML = `Weather feels like: ${allData[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
