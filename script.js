const apiKey = "963060f39382af43b8e5bab3908875f0";

const cityApi =
"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const coordApi =
"https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const locationBtn=document.querySelector(".location-btn");


async function checkWeather(city){

const response=await fetch(cityApi+city+`&appid=${apiKey}`);

if(response.status===404){
alert("Invalid city name");
return;
}

const data=await response.json();

updateWeatherUI(data);
}


async function checkWeatherByCoords(lat,lon){

const response=await fetch(`${coordApi}&lat=${lat}&lon=${lon}&appid=${apiKey}`);

const data=await response.json();

updateWeatherUI(data);
}


function updateWeatherUI(data){

document.querySelector(".city").innerHTML=data.name;

document.querySelector(".temp").innerHTML=
Math.round(data.main.temp)+"°C";

document.querySelector(".humidity").innerHTML=
data.main.humidity+"%";

document.querySelector(".wind").innerHTML=
data.wind.speed+" km/h";


if(data.weather[0].main==="Clouds"){
weatherIcon.src="images/clouds.png";
}

else if(data.weather[0].main==="Clear"){
weatherIcon.src="images/clear.png";
}

else if(data.weather[0].main==="Rain"){
weatherIcon.src="images/rain.png";
}

else if(data.weather[0].main==="Drizzle"){
weatherIcon.src="images/drizzle.png";
}

else if(data.weather[0].main==="Mist"){
weatherIcon.src="images/mist.png";
}

document.querySelector(".weather").style.display="block";
}


function getUserLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat=position.coords.latitude;
const lon=position.coords.longitude;

checkWeatherByCoords(lat,lon);

},

()=>{
alert("Location access denied.");
}

);

}

else{
alert("Geolocation not supported");
}

}


searchBtn.addEventListener("click",()=>{
checkWeather(searchBox.value);
});


searchBox.addEventListener("keypress",(e)=>{
if(e.key==="Enter"){
checkWeather(searchBox.value);
}
});


locationBtn.addEventListener("click",()=>{
getUserLocation();
});


getUserLocation();