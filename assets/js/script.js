$(function () {
    var apiKey = "b3ae335adbb780337592ec0c99fc049f";
    var city = "San Diego"


    function fetchWeatherForCity(city) {

        var queryUrl =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            apiKey;

        $(".weather-card").addClass("card-loading");

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (data1) {
            console.log(data1);

            $("#mainCityName").text(data1.name + " (" + moment().format("M/D/YYYY") + ")");

            var iconUrl =
                "https://openweathermap.org/img/wn/" + data1.weather[0].icon + "@2x.png";

            var iconImg = $("<img>").attr({
                src: iconUrl,
                alt: data1.weather[0].description,
            });

            
            var lat = data1.coord.lat;
            var lon = data1.coord.lon;
            
            
            var queryUrlForecast =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=imperial&exclude=minutely,hourly,alerts&appid=" +
            apiKey;
            
            $.ajax({
                url: queryUrlForecast,
                method: "GET",
            }).then(function (data2) {
                console.log(data2);
                for (i = 1; i < 6; i++) {
                    var day = moment().add(i,"days").format("M/D/YYYY")
                    $("#forecastDate" + i).text("(" + day + ")");
                    $("#forecastIcon" + i).attr("src","https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png");
                    $("#forecastTemp" + i).text("Temp: " + data2.daily[i].temp.day + "°F");
                    $("#forecastHum" + i).text("Humidity: " + data2.daily[i].humidity + "%");
                }
                
                $("#UVbtn").text(data2.current.uvi);
            });
            
            
            $("#mainCityName").append(iconImg);
            $("#tempLoc").text("Temperature: " + data1.main.temp + "°F");
            $("#windLoc").text("Wind Speed: " + data1.wind.speed + " mph");
            $("#humLoc").text("Humidity: " + data1.main.humidity + " %");
            $(".weather-card").removeClass("card-loading");
        });
    }

    fetchWeatherForCity(city);

    //   $(document).on("submit", function() {
    //       $("<p>").appendTo($())


    //   });

    //   $(document).on("click", ".city", function () {

    //     var city = $(this).attr("data-city");
    //     fetchWeatherForCity(city);
    //   });

    //   $("#search-form").on("submit", function (event) {
    //     event.preventDefault();
    //     var city = $("#search-input").val().trim();
    //     if (city === "") {
    //       return;
    //     }
    //     fetchWeatherForCity(city);
    //   });
});
