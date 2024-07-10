// (26.72°C × 9/5) + 32 = 80.096°F

let srchinput = document.getElementsByClassName('srchinput')[0]
let srchbtn = document.getElementsByClassName("srchbtn")[0]

const API_KEY = "44049957cd39c54716054a34be36db63";
let newcountry

window.addEventListener('load',()=>{
    fetchData()
    displayData()
})


srchbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    newcountry = srchinput.value
    fetchData(newcountry)
})
const fetchData = async (newcountry = 'islamabad')=>{
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newcountry}&units=metric&appid=${API_KEY}`)

    let data = await res.json()
    displayData(data)

} 

const displayData = (data)=>{
    console.log(data);
    
    let mainInfo = document.querySelector('.main-info')
    

    let weatherCondition = data.list[0].weather[0].main

    if(weatherCondition == 'Clouds'){
        weatherIcon = './assets/cloudy.png'
    }else if(weatherCondition == "Clear"){
        weatherIcon = './assets/sunny.png'
    }else if(weatherCondition == "Rain"){
        weatherIcon = './assets/rainy.png'
    }else if(weatherCondition == "Snow"){
        weatherIcon = './assets/snowy.png'
    }
    

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
          <p class="city-date" style="opacity: 0.8; font-size: 15px">
            ${data.list[0].dt_txt}
          </p>
          <hr />
          <div class="main-weather-info">
            <div class="wind" style="font-size: 17px">
              <span style="font-weight: 700; font-size: 17px">Wind Speed:</span
              >&nbsp;&nbsp;${data.list[0].wind.speed}&nbsp;km/h
            </div>
            <div class="humidity" style="font-size: 17px">
              <span style="font-weight: 700; font-size: 17px">Humidity:</span
              >&nbsp;&nbsp;${data.list[0].main.humidity}&nbsp;gm/m
            </div>
          </div>
          <hr />
          <h3 class="Weather-description">${data.list[0].weather[0].main}</h3>
        </div>
    `
    mainInfo.innerHTML = mainData

}

