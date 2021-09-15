//open weather API Username: Ddiaz89 password: OpenWeather1! Key: Weather_Or_Not

var button = document.getElementById("search");
var searchedList = document.getElementById("searchedList");

function citySearch() {
  // window.alert("test");
  var city = document.getElementById("citySearch").value;
  //gets div class
  //console.log(city);

  ///create list search history
  var list = document.createElement("button");

  list.innerHTML = city;

  searchedList.appendChild(list);

  //create function for if searched list button clicked, fetch for city info

  //Fetch

  //key for access
  var APIKey = "b146554ac25416dcfae9f71c3dc45805";

  //used for fetch
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  // used for 5-day forecast
  var queryForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  //fetch for current day
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //logs correctly
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var name = data.name;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.daily);
          var dayInfoContainer = document.getElementById("city");
          var icon =
            "http://openweathermap.org/img/wn/" +
            data.current.weather[0].icon +
            ".png";
          var iconImg = document.createElement("img");
          iconImg.setAttribute("src", icon);
          var card = document.createElement("div");
          var tempElement = document.createElement("p");
          var windElement = document.createElement("p");
          var humidityElement = document.createElement("p");
          var uviElement = document.createElement("p");
          var cityName = document.createElement("h1");

          //use unix timestamp to create date
          var date = new Date(data.current.dt * 1000);

          //add text context to all new elements
          cityName.textContent =
            name + " " + date.toLocaleString().slice(0, -12);
          tempElement.textContent = "Temp: " + data.current.temp + "°F";
          windElement.textContent = "Wind: " + data.current.wind_speed + "MPH";
          humidityElement.textContent =
            "Humidity: " + data.current.humidity + "%";
          uviElement.textContent = "UVI: " + data.current.uvi;

          cityName.append(iconImg);
          card.append(
            cityName,
            tempElement,
            windElement,
            humidityElement,
            uviElement
          );
          dayInfoContainer.append(card);
          dayInfoContainer.removeClass("container");

          //section for 5 day forecast
          for (let i = 1; i < 6; i++) {
            console.log(data.daily[i].dt);
          }
        });
    });

  //fetch for five day forecast

  city.value = "";
}

button.addEventListener("click", citySearch);
