$(function () {

    //These variables set my API key for openWeather and the starting city, which will be New York upon entry
    var apiKey = "b3ae335adbb780337592ec0c99fc049f";
    var city = "New York"

    //This function checks if any city is in local storage and, if yes, replaces NYC with that city
    if (JSON.parse(localStorage.getItem("savedCity")) != null){
        city = JSON.parse(localStorage.getItem("savedCity"));
    };

    //This function controls all of the openWeather API gathering
    function fetchWeatherForCity(city) {

        //This variable is the first of two URLs to openWeather
        var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;

        //This ajax call gets the current weather information and retrieves the Lat/Lon of the city
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (data1) {

            //This sets the current day using moment.js
            $("#mainCityName").text(data1.name + " (" + moment().format("M/D/YYYY") + ")");

            //This variable is the URL where each weather icon will come from
            var iconUrl =
            "https://openweathermap.org/img/wn/" + data1.weather[0].icon + "@2x.png";

            //This variable grabs the new Icon
            var iconImg = $("<img>").attr({
                src: iconUrl,
                alt: data1.weather[0].description,
            });

            //these variables grab the latitude and longitude of the current city
            var lat = data1.coord.lat;
            var lon = data1.coord.lon;

            //This is the URL for the second ajax call, which will get the forecast data
            var queryUrlForecast =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat +
                "&lon=" +
                lon +
                "&units=imperial&exclude=minutely,hourly,alerts&appid=" +
                apiKey;

            //This ajax call gets all forecast data, as well as the current UV index
            $.ajax({
                url: queryUrlForecast,
                method: "GET",
            }).then(function (data2) {

                //This for loop sets each day's entires in the five day forecast
                for (i = 1; i < 6; i++) {
                    var day = moment().add(i, "days").format("M/D/YYYY")
                    $("#forecastDate" + i).text("(" + day + ")");
                    $("#forecastIcon" + i).attr("src", "https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png");
                    $("#forecastTemp" + i).text("Temp: " + data2.daily[i].temp.day + "°F");
                    $("#forecastHum" + i).text("Humidity: " + data2.daily[i].humidity + "%");
                }

                //This sets the current day's UV index on the upper section of the page
                $("#UVbtn").text(data2.current.uvi);
            });

            //These sections set the current day's atrtibutes on the upper section of the page
            $("#mainCityName").append(iconImg);
            $("#tempLoc").text("Temperature: " + data1.main.temp + "°F");
            $("#windLoc").text("Wind Speed: " + data1.wind.speed + " mph");
            $("#humLoc").text("Humidity: " + data1.main.humidity + " %");
        });
    };

    //This calls the weather function to populate the first pre-set city
    fetchWeatherForCity(city);

    //This listener event is what happens when a user clicks on the submit button to search for a city
    $("#searchForm").on("submit", function (event) {
        event.preventDefault();

        //This sets the city variable as the input city and saves that input in local storage
        city = $("#searchInput").val().trim();
        localStorage.setItem('savedCity', JSON.stringify(city));

        //If there is nothing in the input field, this breaks out of the function
        if (city === "") {
            return;
        };

        //After receiving the new city variable, this grabs the weather data
        fetchWeatherForCity(city);
        
        //This takes the city variable and creates a button in the search history section
        var newDiv = $("<div>").prependTo($("#btnList"));
        newDiv.attr("id",city);
        newDiv.attr("class","cityDiv");
        var newBtn = $("<button>")
        newBtn.attr("type", "button");
        newBtn.addClass("btn btn-primary btn-sm mt-1 city");
        newBtn.attr("id", city);
        newBtn.text(city);
        newBtn.appendTo(newDiv);

        //This clears out the input field
        $("#searchInput").val("");
    });


    // $(".city").on("click", function (event) {
    //     event.preventDefault();
    //     city = $(this).child().child().attr("id");
    //     fetchWeatherForCity(city);
    // });
});

