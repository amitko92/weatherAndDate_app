// select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "db7f8c8dc0f24ee37afaf7da9844c70e";

// check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// show error

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
   // let api = 'http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={key}';
   
   fetch(api).then(function(response){
       let data = response.json();
       return data;
   }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
   }).then(function(){
       displayWeather();
   });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return(temperature * 9/5) + 32;
}

// when the user clicks on the temperature element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

function currentTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var dayOfWeek = date.getDay();
    var day = date.getDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getFullYear();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec;
    document.getElementById("dayOfMonth").innerText = day + "." + month + "." + year;
    document.getElementById("day").innerText = convertDay(dayOfWeek);
    var t = setTimeout(function(){
        currentTime() }, 1000);
}

function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }

  function convertDay(day){
    switch(day) {
        case 0:
          return "Sunday"; 
        case 1:
          return "Monday"
        case 3:
          return "Tuesday"
        case 4:
          return "Wednesday"; 
        case 5:
          return "Thursday"
        case 5:
          return "Fridaay"; 
        case 6:
          return "Saturday";
        default:
          return "Sunday";
      }
  }

  currentTime();