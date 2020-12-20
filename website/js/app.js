// Local Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '96d15f9c58b0922548c54c6a9bbbe196';

// Event Listeners
document.getElementById('generate').addEventListener('click', generateBtnOnClick)


// Events Handlers
function generateBtnOnClick(event) {
    const zipCode = document.getElementById('zip').value;
    const countryCode = document.getElementById('countries').value;
    const feeling = document.getElementById('feeling').value;
    getCurrentWeather(zipCode, countryCode, feeling);
}
//49546
// Main Functions

// Add new Weather Entry

function addWeatherEntry(weatherNewEntry) {
    postData('/new', weatherNewEntry).then(data => {
        console.log(`new entry posted: 
        ${JSON.stringify(data)}`);
        //getData('/all').then(data => console.log(`all data = ${JSON.stringify(data)}`));
    });
}

//Open Weather Map API

function getCurrentWeather(zipCode, countryCode, feeling) {
    getData(`${baseURL}?zip=${zipCode},${countryCode}&appid=${apiKey}`).then(data => {
        const newEntry = { temperature: data.main.temp, date: Date(), feeling: feeling };
        addWeatherEntry(newEntry);
    });
}


// ASYNC Functions
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// postData('/new', { temperature: 21, date: Date(), response: 'some response' }).then(data => {
//     console.log(data);
//     getData('/all').then(data => console.log(`all data = ${JSON.stringify(data)}`));
// });


