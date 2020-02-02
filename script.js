var APIKey = "8f56ebe3193e441054cfe4955575e5a2";
var date = new Date(); //console.log(date);
var day = date.getDate();console.log(day);
var month = date.getMonth()+1;
var year = date.getFullYear()%1000;
var d2 = new Date;d2.setDate(d2.getDate()+1);
var d3 = new Date;d3.setDate(d3.getDate()+2);
var d4 = new Date;d4.setDate(d4.getDate()+3);
var d5 = new Date;d5.setDate(d5.getDate()+4);

//console.log(" Date Test: " + aDate);
var today = date.getMonth()+1 + "/" + date.getDate() + "/" + year;console.log("date: " + today);
var day2 = d2.getMonth()+1 + "/" + d2.getDate() + "/" + year;console.log("tomorrow: " + day2);
var day3 = d3.getMonth()+1 + "/" + d3.getDate()+ "/" + year;console.log("day + 2: " + day3);
var day4 = d4.getMonth()+1 + "/" + d4.getDate() + "/" + year;console.log("day + 3 " + day4);
var day5 = d5.getMonth()+1 + "/" + d5.getDate() + "/" + year;console.log("day + 4: " + day5);
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
var geoKey = "61fd3280-4a17-41e9-9bbb-22be2d617151";
var geoURL = "https://api.ipfind.com/me?auth=" + geoKey 
$.ajax({
    url: geoURL,
    method: "GET"
    })
    //We store all of the retrieved data inside of an object called "response"
     .then(function (response) {
        //processData(response.city);
        console.log("city from geo " + response.city);
        var newURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        response.city + "&units=imperial&appid=" + APIKey;
        caller(newURL);
        //var currentLoction = "Y"
        forecast( response.city);
        //processData(response);
     });

    function processData(response) {
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
    $(".icon").html(iconImg);
} 

function caller(qURL)
{
    $.ajax({
    //url: queryURL,
    url: qURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response){processData(response);});
}

$(".btn").on("click", function(e){
    e.preventDefault();
    var input = $(this).attr("data-input");
        console.log(input);
        var data = $("#" + input).val();
        console.log(data);
        localStorage.setItem(data, data);
        //var cityArray = [];
        searches(data);
        var searchFor = "https://api.openweathermap.org/data/2.5/weather?q=" +
      data + "&units=imperial&appid=" + APIKey;
      caller(searchFor)
      $("#" + input).val("");
      forecast(data);
});

function forecast(data)
{
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    data+"&units=imperial&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
        })
        .then (function (response){
            console.log(response);
        
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
            compute(response, 14, tempArray2, humidityArray2, weatherIcon2, image2, day2Temp, day2Hum);
            compute(response, 23, tempArray3, humidityArray3,weatherIcon3,image3, day3Temp, day3Hum);
            compute(response, 31,tempArray4, humidityArray4, weatherIcon4, image4, day4Temp, day4Hum);        
            compute(response, 39,tempArray5, humidityArray5, weatherIcon, image5, day5Temp, day5Hum);
            $(".today").text(today);
            $(".day2").text(day2);
            $(".day3").text(day3);
            $(".day4").text(day4);
            $(".day5").text(day5);
        });
}

function compute(response, num, tempA, humA, iconA, imgComp, tempPar, humPar)
    {
        for (var i = 0; i<= num; i++)
            {
                tempA.push(parseInt(response.list[i].main.temp));
                humA.push(parseInt(response.list[i].main.humidity));
                var iconstr = (response.list[i].weather[0].icon)//.toString()
                iconA.push(iconstr);
            }
            console.log("Weather looks of the day: " + iconA);
            var averageTemp = average(tempA);
            var averageHum = average(humA);
            tempPar.text("Temp: " +  averageTemp);//todayHum
            humPar.text("Hum: " +  averageHum);
            selectIcon(iconA,imgComp);//pass html tag here
            return;
    }

function average(arr) 
{
    //console.log("array = " + arr) 
    var sum = 0;
    for (var i = 0; i< arr.length; i++)
    { 
        sum = sum + arr[i]; 
    }
    //console.log("sum = " + sum);
    return (sum/arr.length).toPrecision(4);
}
function selectIcon(icon, imgSelect)
{
    console.log("Icon Array passed is: " + icon);
    var clr, fewC, scattC, brokenC, showerR, rain, tStorm, snow, mist, night;
    clr = 0; fewC = 0; scattC = 0; brokenC = 0; showerR = 0; rain = 0; tStorm = 0; snow = 0; mist =0;night = 0;
    for (var i = 0; i<icon.length; i++)
    {   
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
        }
    }
};

function searches (city){
    cityList = $("<li>"); 
    cityList.addClass("list-group-item");
    cityList.text(city);
    $(".list-group").prepend(cityList);
    cityArray.push(localStorage.getItem(city));
    localStorage.setItem(cityArray, cityArray);

  }
  