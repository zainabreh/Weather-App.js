let srchinput = document.getElementsByClassName('srchinput')[0]
let srchbtn = document.getElementsByClassName("srchbtn")[0]
const API_KEY = "44049957cd39c54716054a34be36db63";
let newcountry
srchbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    newcountry = srchinput.value
    fetchData(newcountry)
})
const fetchData = (newcountry = 'islamabad')=>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newcountry}&units=metric&appid=${API_KEY}`).then((res)=>res.json()).then((data)=>{
        console.log(data);
    })
} 

fetchData()