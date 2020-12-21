// Imports
import { getData, postData } from './async.js';

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
    const unit = document.getElementById('metric').checked ? 'metric' : 'imperial';
    getCurrentWeatherAsync(zipCode, countryCode, feeling, unit).then(data => {
        //Add new weather entry
        addWeatherEntry(data);
        //Update UI with data
        updateUI();
    });
}

// Main Functions
//Open Weather Map API

const getCurrentWeatherAsync = async (zipCode, countryCode, feeling, unit) => {
    try {
        let newEntry = {};
        await getData(`${baseURL}?zip=${zipCode},${countryCode}&units=${unit}&appid=${apiKey}`).then(data => {
            newEntry = { temperature: data.main.temp, date: Date(), response: feeling };
        });
        return newEntry;
    } catch (error) {
        console.log('error', error);
    }
};

// Add new Weather Entry
function addWeatherEntry(newEntry) {
    postData('/new', newEntry);
}

// Update UI
const updateUI = async () => {
    //getAll data
    try {
        const allData = await getData('/all');
        const date = document.querySelector('#date');
        const temp = document.querySelector('#temp');
        const content = document.querySelector('#content');
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temperature;
        content.innerHTML = allData.response;
    } catch (error) {
        console.log('error', error);
    }
};