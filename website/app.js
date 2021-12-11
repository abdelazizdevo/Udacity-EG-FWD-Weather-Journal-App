/* Global Variables */
// Personal API Key for OpenWeatherMap API
let reqUrl          = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey        = 'b25c2a504cf74908d7ea7cf3a364325c&units=imperial';
let appUrl          = 'http://localhost:8080';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
document.getElementById('generate').addEventListener('click', getWeatherNow);

const postWeatherData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log(error);
    }
}


function getWeatherNow(event){
    console.log('sss');
    event.preventDefault();
    const postCode  = document.getElementById('zip').value;
    const content   = document.getElementById('feelings').value;
    getWeatherTemperature(reqUrl, postCode, apiKey)
        .then(function (data){
            postWeatherData(appUrl + '/add', {temp: data.main.temp, date: newDate, content: content } )
                .then(function() {
                    retrieveData();
                })
        })
}

// Async GET Function
const getWeatherTemperature = async (reqUrl, zipCode, apiKey)=>{
    const responseData  = await fetch(reqUrl + '?zip=' + zipCode + '&APPID=' + apiKey);
    try {
        const weatherData = await responseData.json();
        return weatherData;
    }
    catch(error) {
        console.log(error);
    }
}


// Update user interface with the retrieved data
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML       = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML    = allData.feel;
        document.getElementById('date').innerHTML       = allData.date;
    }
    catch(error) {
        console.log(error);
        // appropriately handle the error
    }
}
