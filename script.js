var APIKey = "8f56ebe3193e441054cfe4955575e5a2";//"166a433c57516f51dfab1f7edaed8413";
var date = new Date(); console.log(date);
//var hour = date.getHours();console.log(hour);
var day = date.getDate();console.log(day);
var month = date.getMonth()+1;console.log(month);
var year = date.getFullYear()%1000;console.log(year);
var today = month + "/" + day + "/" + year;
var day2 = month + "/" + (day + 1) + "/" + year;
var day3 = month + "/" + (day + 2)+ "/" + year;
var day4 = month + "/" + (day + 3) + "/" + year;
var day5 = month + "/" + (day + 4) + "/" + year;
var tempArray = [];
var humidityArray = [];
var tempArray2 = [];
var humidityArray2 = [];
var tempArray3 = [];
var humidityArray3 = [];
var tempArray4 = [];
var humidityArray4 = [];
var tempArray5 = [];
var humidityArray5 = [];
//var day1 = month + "/" + day + 5 + "/" + year;
console.log(today);

    // Here we are building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      //"q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;
    //   var searchVal = $("#search").val();
    //   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q" +
    //   searchVal + "&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
$(".btn").on("click", function(even){
    event.preventDefault();
    var input = $(this).attr("data-input");
        console.log(input);
        var data = $("#" + input).val();
        console.log(data);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      data + "&units=imperial&appid=" + APIKey;
      var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      data+"&units=imperial&appid=" + APIKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        var iconCode = response.weather[0].icon;
        console.log(iconCode);
        var iconSRC= ("http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
        iconSRC = iconSRC.trim();
        console.log(iconSRC); 
        var iconImg = $("<img>");
        iconImg.attr("src", iconSRC);
        // Transfer content to HTML
        $("#cityName").text(response.name + " "+ today);
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#temp").text("Temperature (F): " + response.main.temp);
        //$("#uv").text("UV Index: " + response.
        //$(".icon").html(`<img src = "http://openweathermap.org/img/wn/10d@2x.png">`);
        $(".icon").html(iconImg);

        // Converts the temp to Kelvin with the below formula
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // $(".tempF").text("Temperature (Kelvin) " + tempF);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
        })
        .then (function (response){
            console.log(response);
            console.log(response.list);
            console.log(response.list[0]);
            console.log(response.list[0].main);
            console.log(response.list[0].main.temp);
            // for (var i = 0; i<= 7; i++)
            // {
            //     tempArray.push(parseInt(response.list[i].main.temp));console.log(tempArray)
            //     humidityArray.push(parseInt(response.list[i].main.humidity));console.log(humidityArray);
            //     var averageTemp = average(tempArray);
            //     var averageHum = average(humidityArray);
            // }
            

            tempArray = compute(response, 7);
            humidityArray = [response, 7];
            tempArray2 = compute(response, 14);
            humidityArray2 = [response, 14];
            tempArray3 = compute(response, 23);
            humidityArray3 = [response, 23];
            tempArray4 = compute(response, 31);
            humidityArray4 = [response, 31];
            tempArray5 = compute(response, 39);
            humidityArray5 = [response, 39];


            
            console.log(year%1000);
            $(".today").text(today);
            $(".day2").text(day2);
            $(".day3").text(day3);
            $(".day4").text(day4);
            $(".day5").text(day5);
            //console.log(response.list[0].main.temp);
        });
});

function compute(response, num)
    {
        for (var i = 0; i<= num; i++)
            {
                tempArray.push(parseInt(response.list[i].main.temp));//console.log(tempArray)
                humidityArray.push(parseInt(response.list[i].main.humidity));//console.log(humidityArray);
                //var averageTemp = average(tempArray);
                //var averageHum = average(humidityArray);
            }

            var averageTemp = average(tempArray);
            var averageHum = average(humidityArray);
            var averageTemp2 = average(tempArray2);
            var averageHum2 = average(humidityArray2);
            var averageTemp3 = average(tempArray3);
            var averageHum3 = average(humidityArray3);
            var averageTemp4 = average(tempArray4);
            var averageHum4 = average(humidityArray4);
            var averageTemp5 = average(tempArray5);
            var averageHum5 = average(humidityArray5);
            console.log(averageTemp);
            console.log(averageHum);
            console.log(averageTemp2);
            console.log(averageHum2);
            console.log(averageTemp3);
            console.log(averageHum3);
            console.log(averageTemp4);
            console.log(averageHum4);
            console.log(averageTemp5);
            console.log(averageHum5);
    }

function average(arr) 
{
    //console.log("array = " + arr) 
    var sum = 0;
    for (var i = 0; i< arr.length; i++)
    {
        //console.log("Value at index " + i + "= " + arr[i]);
        
        sum = sum + arr[i]; 
        //console.log("Sum in loop = " + sum);
    }
    //console.log("sum = " + sum);
    return sum/arr.length
}