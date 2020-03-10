let lat,lon;

//Api Url according to user's location
function getUrl(lat, lon){
  url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&&units=metric&APPID=9c61a836727ccf984e5bb889f6380d7b';
  return url;
}

//Get user's location
navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  
  url = getUrl(lat, lon);
  myJSON();

},

//Show message if user denies location access permission
function(error) {
  if (error.code == error.PERMISSION_DENIED){
    let denied = document.createElement("p");
    denied.innerHTML="Please allow location permission to get weather information.";
    let den = document.getElementsByClassName("location");
    den[0].appendChild(denied);
  }
});  

//Adjust minutes format for Date object
function minutesFormat(minutes){
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  return minutes;
}

//Fetch weather data from OpenWeatherMap API
function myJSON(){
  fetch(url)
  .then(resp => resp.json()
    .then(data => { 
  console.log(data);
  var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  $(".icon img").attr('src', icon);
  var temp = Math.round(data.main.temp);
  $(".temp").html(temp + " &#176;C");
  var weather = data.weather[0].main;
  $(".weather").html(weather);
  var feels = Math.round(data.main.feels_like);
  $(".feels").html("Feels like: " + feels + " &#176;C");
  var humidity = data.main.humidity;
  $(".humidity").html("Humidity " + humidity + "%");
  var city = data.name;
  $(".city").html(city);
  var now = new Date();
  var time = now.getHours() + ":" + minutesFormat(now.getMinutes());
  $(".time").html(time);
  var windSpeed = data.wind.speed;
  $(".wind-speed").html("Wind speed " + windSpeed + " mph");
  var clouds = data.clouds.all;
  $(".clouds").html("Cloud cover " + clouds + "%");
  var sunrise = new Date(data.sys.sunrise*1000);
  var sunriseTime = sunrise.getHours() + ":" + minutesFormat(sunrise.getMinutes());
  $(".sunrise").html("Sunrise " + sunriseTime);
  var sunset = new Date(data.sys.sunset*1000);
  var sunsetTime = sunset.getHours() + ":" + minutesFormat(sunset.getMinutes());
  $(".sunset").html("Sunset " + sunsetTime);
  })
  ).catch(function (err) {
    console.log('Fetch Error : ', err);
  });

}