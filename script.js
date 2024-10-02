const searchBtn = document.querySelector("#search");
const searchInp = document.querySelector("input");

searchBtn.addEventListener("click", async function(){
    const location = searchInp.value;
    if(location != ""){
        const data = await fetchweather(location)
        if(data != null){
            updateDOM(data);
        }
        searchInp.value = "";
    }
})


const tempEle = document.querySelector(".temperature");
const locationEle = document.querySelector(".location");
const timeEle = document.querySelector(".time");
const dayEle = document.querySelector(".day");
const dateEle = document.querySelector(".date");
const conditionEle = document.querySelector(".condition");
const imageEle = document.querySelector(".emoji");
const humidEle = document.querySelector(".humid");

function updateDOM(data){
    console.log("update data",data);
    const temp = data.current.temp_c;
    const city = data.location.name;
    const timeDate = data.location.localtime;
    const [date,time] = timeDate.split(" ");
    const weatherCon = data.current.condition.text;
    const emojiUpdate = data.current.condition.icon;
    const humidUpdate = data.current.humidity;

    tempEle.textContent = temp + "°C";
    locationEle.textContent = city;
    timeEle.textContent = time;
    dateEle.textContent = date;
    conditionEle.textContent = weatherCon;
    imageEle.src = emojiUpdate;
    humidEle.textContent = "Humidity : " +  humidUpdate ;
}

async function fetchweather(location){
    
    const url = `https://api.weatherapi.com/v1/current.json?key=6134d93ec3e149f6b6a65714242909&q=${location}&aqi=yes`
    const response = await fetch(url);
    if(response.status == 400){
        alert("Location invalid");
        return null;
    }
    else if(response.status == 200){
        const json = await response.json();
        return json;
    }
}
