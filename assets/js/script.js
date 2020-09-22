$(function () {
    var apiKey = "b3ae335adbb780337592ec0c99fc049f";
    var city = "New York"


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
        }).then(function (data) {
            console.log(data);

            $("#mainCityName").text(data.name + " (" + moment().format("M/D/YYYY") + ")");

            var iconUrl =
                "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

            var iconImg = $("<img>").attr({
                src: iconUrl,
                alt: data.weather[0].description,
            });

            var UV = ""

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var queryUVUrl =
                "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
                lat +
                "&lon=" +
                lon +
                "&appid=" +
                apiKey;

            $.ajax({
                url: queryUVUrl,
                method: "GET",
            }).then(function (data) {
                console.log(data);

                $("#UVbtn").text(data[7].value);
            });

            $("#mainCityName").append(iconImg);
            $("#tempLoc").text("Temperature: " + data.main.temp + "°F");
            $("#windLoc").text("Wind Speed: " + data.wind.speed + " mph");
            $("#humLoc").text("Humidity: " + data.main.humidity + " %");
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
