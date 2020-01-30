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
var weatherIcon = [];
var tempArray2 = [];
var humidityArray2 = [];
var weatherIcon2 = [];
var tempArray3 = [];
var humidityArray3 = [];
var weatherIcon3 = [];
var tempArray4 = [];
var humidityArray4 = [];
var weatherIcon4 = [];
var tempArray5 = [];
var humidityArray5 = [];
var weatherIcon5 = [];
//var day1 = month + "/" + day + 5 + "/" + year;
console.log(today);
var cityArray = [];

var image1 = $(".img1");
var image2 = $(".img2");
var image3 = $(".img3");
var image4 = $(".img4");
var image5 = $(".img5");


    // Here we are building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      //"q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;
    //   var searchVal = $("#search").val();
    //   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q" +
    //   searchVal + "&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
$(".btn").on("click", function(e){
    e.preventDefault();
    var input = $(this).attr("data-input");
        console.log(input);
        var data = $("#" + input).val();
        console.log(data);
        localStorage.setItem(data, data);
        //var cityArray = [];
        searches(data);
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
        $("#" + input).val("");
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
        })
        .then (function (response){
            console.log(response);
            // console.log(response.list);
            // console.log(response.list[0]);
            // console.log(response.list[0].main);
            // console.log(response.list[0].main.temp);
/////////////////////////////////////
//Not needed
            // for (var i = 0; i<= 7; i++)
            // {
            //     tempArray.push(parseInt(response.list[i].main.temp));console.log(tempArray)
            //     humidityArray.push(parseInt(response.list[i].main.humidity));console.log(humidityArray);
            //     var averageTemp = average(tempArray);
            //     var averageHum = average(humidityArray);
            // }
//            ///////////////////////////////////////////
var todayTemp = $(".todayTemp");
var todayHum = $(".todayHum");
var day2Temp = $(".day2Temp");
var day2Hum = $(".day2Hum");
var day3Temp = $(".day3Temp");
var day3Hum = $(".day3Hum");
var day4Temp = $(".day4Temp");
var day4Hum = $(".day4Hum");
var day5Temp = $(".day5Temp");
var day5Hum = $(".day5Hum");


            compute(response, 7, tempArray, humidityArray, weatherIcon, image1, todayTemp, todayHum);
            //humidityArray = [response, 7];
            //tempArray2 = compute(response, 14);
            compute(response, 14, tempArray2, humidityArray2, weatherIcon2, image2, day2Temp, day2Hum);
            // //humidityArray2 = response, 14];
            // //tempArray3 = compute(response, 23);
            compute(response, 23, tempArray3, humidityArray3,weatherIcon3,image3, day3Temp, day3Hum);
            // //humidityArray3 = [response, 23];
            // //tempArray4 = compute(response, 31);
            compute(response, 31,tempArray4, humidityArray4, weatherIcon4, image4, day4Temp, day4Hum);
            // //humidityArray4 = [response, 31];
            // //tempArray5 = compute(response, 39);
            compute(response, 39,tempArray5, humidityArray5, weatherIcon, image5, day5Temp, day5Hum);
            // //humidityArray5 = [response, 39];


            
            //console.log(year%1000);
            $(".today").text(today);
            $(".day2").text(day2);
            $(".day3").text(day3);
            $(".day4").text(day4);
            $(".day5").text(day5);
            //console.log(response.list[0].main.temp);
        });
});
console.log("City Array = " + cityArray);
function compute(response, num, tempA, humA, iconA, imgComp, tempPar, humPar)
    {
        for (var i = 0; i<= num; i++)
            {
                //tempArray = tempA.push(parseInt(response.list[i].main.temp));//console.log(tempArray)
                tempA.push(parseInt(response.list[i].main.temp));
                //humidityArray = humA.push(parseInt(response.list[i].main.humidity));//console.log(humidityArray);
                humA.push(parseInt(response.list[i].main.humidity));
                //console.log("Weather code is " + response.list[i].weather[0].icon);
                var iconstr = (response.list[i].weather[0].icon)//.toString()
                iconA.push(iconstr);
                //weatherIcon = iconA;
                //console.log("Weather code is " + weatherIcon);
                //console.log("type of code is " + typeof(iconstr));
                //var averageTemp = average(tempArray);
                //var averageHum = average(humidityArray);
            }
            //console.log(tempA);
            //console.log(humA);
            console.log("Weather looks of the day: " + iconA);
            var averageTemp = average(tempA);
            var averageHum = average(humA);
            tempPar.text("Temp: " +  averageTemp);//todayHum
            humPar.text("Hum: " +  averageHum);
            //var averageLook = average()           
            //*var averageTemp2 = average(tempA2);
            //*var averageHum2 = average(humA2);
            //*$(".day2Temp").text("Temp: " +  averageTemp2);//todayHum
            //*$(".day3Hum").text("Hum: " +  averageHum2);
            // var averageTemp3 = average(tempArray3);
            // var averageHum3 = average(humidityArray3);
            // var averageTemp4 = average(tempArray4);
            // var averageHum4 = average(humidityArray4);
            // var averageTemp5 = average(tempArray5);
            // var averageHum5 = average(humidityArray5);
            //*console.log("Average temp of the day " + averageTemp);
            //*console.log("Average humidity of the day " + averageHum);
            
            //console.log(averageLook);
            // console.log(averageTemp2);
            // console.log(averageHum2);
            // console.log(averageTemp3);
            // console.log(averageHum3);
            // console.log(averageTemp4);
            // console.log(averageHum4);
            // console.log(averageTemp5);
            // console.log(averageHum5);
            selectIcon(iconA,imgComp);//pass html tag here
            return;
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
    return (sum/arr.length).toPrecision(2);
}
function selectIcon(icon, imgSelect)
{
    console.log("Icon Array passed is: " + icon);
    var clr, fewC, scattC, brokenC, showerR, rain, tStorm, snow, mist, night;
    clr = 0; fewC = 0; scattC = 0; brokenC = 0; showerR = 0; rain = 0; tStorm = 0; snow = 0; mist =0;night = 0;
    for (var i = 0; i<icon.length; i++)
    {
        //console.log("Icon Array passed is: " + icon)
        //02n,01n,01n,01n,01d,01d,03d,03n--01d, 02d,03d, 04d,09d, 10d, 11d, 13d, 50d
        
        if(icon[i] === "01d"){ 
            clr ++;
            console.log("01d entered" + clr);
            localStorage.setItem(clr, "01d");
        }
        else if (icon[i]=== "02d"){
            fewC++;
            console.log("02d entered" + fewC);
            localStorage.setItem(fewC, "02d");
        }
        else if (icon[i] === "03d"){
            scattC++;
            console.log("03d entered" + scattC);
            localStorage.setItem(scattC,"03d");
        }
        else if (icon[i] === "04d"){
            brokenC++;
            localStorage.setItem(brokenC, "04d");
        }
        else if (icon[i] === "09d"){
            showerR++;
            localStorage.setItem(showerR, "09d");
        }
        else if (icon[i] === "10d"){
            rain++;
            localStorage.setItem(rain, "10d");
        }
        else if (icon[i] === "11d"){
            tStorm++;
            localStorage.setItem(tStorm, "11d");
        }
        else if (icon[i] === "13d"){
            snow++;
            localStorage.setItem(snow, "13d");
        }
        else if (icon[i] === "50d"){
            mist++;
            localStorage.setItem(mist, "50d");
        }
        else 
        night++;
        console.log("night entered" + night);
    }

    // var clear = localStorage.getItem("01d");
    // var fCloud = localStorage.getItem("02d");
    // var sCloud = localStorage.getItem("03d");
    // var brCloud = localStorage.getItem("04d");
    // var shower = localStorage.getItem("09d");
    // var rainy = localStorage.getItem("10d");
    // var storm = localStorage.getItem("11d");
    // var snowy = localStorage.getItem("13d");
    // var misty = localStorage.getItem("50d");

    var iconCounter = [];
    iconCounter.push(clr, fewC, scattC, brokenC, showerR, rain, tStorm, snow, mist);
    console.log("Icon counter:  " + iconCounter);
    var max = iconCounter[0];

  for (var i = 1; i < iconCounter.length; i++) {
    var currentNum = iconCounter[i];

    if (currentNum > max) {
      max = currentNum;
    }
  }
  console.log("max: " + max);
  console.log(localStorage.getItem(max));
  console.log("Weather condition of the day:  " + localStorage.getItem(max));
  var dayIcon = localStorage.getItem(max);
  var dayIconSRC = ("http://openweathermap.org/img/wn/" + dayIcon + "@2x.png");
  renderImg (dayIconSRC, imgSelect);
  return;
}
function renderImg(src, imgRender)
{
    imgRender.attr("src", src);
    return;
}

function renderText(container, content)
{
    container.text(content);
}

window.onload = function(){
    ///if (localStorage.getItem(key))
    console.log("Entering onload function. passing: "  + localStorage.getItem(cityArray));
    if (cityArray.length > 0)
    {
        for (var i = 0; i<cityArray.length; i ++)
        {
            searches(cityArray[i]);
            //console.log("Entering onload function. passing: "  + cityArray[i]);
        }
    }
};
var cityCount = 0;
function searches (city){
    cityList = $("<li>"); 
    cityList.addClass("list-group-item");
    cityList.text(city);
    $(".list-group").prepend(cityList);

    // cityArray[cityCount] = cityArray.push(city);
    cityArray.push(localStorage.getItem(city));
    localStorage.setItem(cityArray, cityArray);

    
    //     //console.log("You searched for: " + cityArray[0]);
    //     for (var i = 0; i<cityArray.length; i ++)
    //     {
    //         //searches(cityArray[i]);
             console.log("City array containt: "  + cityArray);
    //     }

  }
  