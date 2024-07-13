// (26.72°C × 9/5) + 32 = 80.096°F

let srchinput = document.getElementsByClassName("srchinput")[0];
let srchbtn = document.getElementsByClassName("srchbtn")[0];
let imgScreen = document.querySelector(".img-screen");
let days_container = document.querySelector(".days-forcast")

const API_KEY = "44049957cd39c54716054a34be36db63";
let newcountry;
let timezone;
let formattedTime;

window.addEventListener("load", () => {
  fetchData();
  displayData();
});

srchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  newcountry = srchinput.value;
  fetchData(newcountry);
  srchinput.value = " "
});
const fetchData = async (newcountry = "islamabad") => {
  try{
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${newcountry}&units=metric&appid=${API_KEY}`
    );
  
    let data = await res.json();
    displayData(data);
  }catch(err){
    alert("Invalid Input: Try Again")
  }

};

const displayData = (data) => {
  console.log(data);

  let mainInfo = document.querySelector(".main-info");

  let weatherCondition = data.list[0].weather[0].main;
  let weatherIcon;
  let bgScreenIcon;

  if (weatherCondition == "Clouds") {
    weatherIcon = "./assets/cloudy.png";
    bgScreenIcon = "assets/cloudy-ezgif.com-gif-to-webp-converter.webp";
  } else if (weatherCondition == "Clear") {
    weatherIcon = "./assets/sunny.png";
    bgScreenIcon = "./assets/sunny.webp";
  } else if (weatherCondition == "Rain") {
    weatherIcon = "./assets/rainy.png";
    bgScreenIcon = "assets/drizzle-ezgif.com-gif-to-webp-converter.webp";
  } else if (weatherCondition == "Snow") {
    weatherIcon = "./assets/snowy.png";
    bgScreenIcon = "assets/Snow-ezgif.com-gif-to-webp-converter.webp";
  }

  // timezone = data.city.timezone;
  // const date = new Date(data.list[0].dt_txt);
  // formattedTime = date.toLocaleString("en", {
  //   weekday: "short",
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  //   hour: "numeric",
  //   hour12: true,
  //   minute: "numeric",
  //   timeZone: timezone,
  // });
  
  
  let bgScreen = `<div class="screen">
          <img src="${bgScreenIcon}">
        </div>`;

        // Main Data
  let mainData = `
      
        <div class="main-weather-icon">
          <img
            src="${weatherIcon}"
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>

        <div class="main-content">
          <h1 class="city-name">${data.city.name}</h1>
          <h4 class="city-temp">${data.list[0].main.temp} °C</h4>
          <hr />
          <p class="city-date" >
            ${data.list[0].dt_txt}
          </p>
          <hr />
          <div class="main-weather-info">
            <div class="wind" >
              <span >Wind Speed:</span
              >&nbsp;&nbsp;${data.list[0].wind.speed}&nbsp;km/h
            </div>
            <div class="humidity">
              <span >Humidity:</span
              >&nbsp;&nbsp;${data.list[0].main.humidity}&nbsp;gm/m
            </div>
          </div>
          <hr />
          <h3 class="Weather-description">${data.list[0].weather[0].main}</h3>
        </div>
    `;
  mainInfo.innerHTML = mainData;
  imgScreen.innerHTML = bgScreen;


  // Days Data

  let daysData = `
    <div class="table-responsive-sm">
      <table class="table table-dark" style="opacity:.9; ">
        <thead>
          <tr>
            <th scope="col-2">Day</th>
            <th scope="col-2">Temp (°C)</th>
            <th scope="col-2">Weather</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (let i = 1; i < 6; i++) {
    let dayData = data.list[i];
    let day = new Date(dayData.dt_txt[i]).toLocaleDateString("en", {
      weekday: "long",
    });
    let temp = dayData.main.temp;
    let weatherIcon = getWeatherIcon(dayData.weather[0].main);
    let weatherDesc = dayData.weather[0].main;

    daysData += `
      <tr>
        <td style="font-weight:500; font-size:18px;">${day}</td>
        <td style="font-weight:500; font-size:18px;">${temp} °C</td>
        <td>
          <img src="${weatherIcon}" alt="weather-icon" class="dayicon" />
          &nbsp;<span style="font-weight:600; font-size:20px">${weatherDesc}</span>
        </td>
      </tr>
    `;
  }

  daysData += `
        </tbody>
      </table>
    </div>
  `;
  days_container.innerHTML = daysData;
};

const getWeatherIcon = (weatherCondition) => {
  if (weatherCondition == "Clouds") {
    return "./assets/cloudy.png";
  } else if (weatherCondition == "Clear") {
    return "./assets/sunny.png";
  } else if (weatherCondition == "Rain") {
    return "./assets/rainy.png";
  } else if (weatherCondition == "Snow") {
    return "./assets/snowy.png";
  }
};

