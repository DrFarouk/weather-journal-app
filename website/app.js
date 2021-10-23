/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=95cc11eefe8ed4ea571a7974251c629c&units=metric";
const error = document.getElementById("error");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Event listener when on button 'generate'
document.getElementById('generate').addEventListener('click', onGenerate);

/* Post To API */
function onGenerate() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(zip)
    
    .then((data) => {
        postData('/add',  
        {
            date:newDate,
            city:data.name,
            temp:data.main.temp,
            description:data.weather[0].description,
            content:feelings
        });
        
        updatingUI();

        document.getElementById('entry').style.opacity = 1;
    });
};        

const getWeatherData = async (zip) => {
    const res = await fetch(baseURL + zip + apiKey);
    
    try {
      const data = await res.json();

      console.log(`You just used this link`, baseURL + zip + apiKey);
      console.log(`to fetch this data`, data);

      if (data.cod != 200) {
        // display the error message on UI
        error.innerHTML = data.message;
        setTimeout(_=> error.innerHTML = '', 2000)
        throw `${data.message}`;
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
};

const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await res.json();
      console.log(`You just saved`, newData);
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

/* GET Data */
const updatingUI = async () => {
    const res = await fetch('/all');

    try {
      const allData = await res.json();
  
      document.getElementById("date").innerHTML = allData.date;
      document.getElementById("city").innerHTML = allData.city;
      document.getElementById("temp").innerHTML = allData.temp + '&degC';
      document.getElementById("description").innerHTML = allData.description;
      document.getElementById("content").innerHTML = allData.content;

    } catch (error) {
      console.log("error", error);
    }
};