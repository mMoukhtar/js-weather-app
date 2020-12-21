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
    getCurrentWeatherAsync(zipCode, countryCode, feeling).then(data => {
        //Add new weather entry
        addWeatherEntry(data);
        //Update UI with data
        updateUI();
    });
}
//49546
// Main Functions
//Open Weather Map API

//Question, which is correct or better way to declare function
// way#1 - async function someFunctionName(zipCode, countryCode, feeling), or
// way#2 - const someFunctionName = (zipCode, countryCode, feeling) => {}
async function getCurrentWeatherAsync(zipCode, countryCode, feeling) {
    try {
        let newEntry = {};
        //Question, which way is correct?
        //await getData(`${baseURL}?zip=${zipCode},${countryCode}&appid=${apiKey}`).then(data => {}, or
        //const data = await getData(`${baseURL}?zip=${zipCode},${countryCode}&appid=${apiKey}`)
        await getData(`${baseURL}?zip=${zipCode},${countryCode}&appid=${apiKey}`).then(data => {
            newEntry = { temperature: data.main.temp, date: Date(), response: feeling };
            //Question, why when I use return inside the then method it fail to and I recieve undefind object in line 18 when I call this function?!!
            // return newEntry;
        });
        return newEntry;
    } catch (error) {
        console.log('error', error);
    }
}

// Add new Weather Entry
function addWeatherEntry(newEntry) {
    postData('/new', newEntry).then();
}

// Update UI
const updateUI = async () => {
    //getAll data
    try {
        const allData = await getData('/all');
        const date = document.querySelector('#date');
        const temp = document.querySelector('#temp');
        const content = document.querySelector('#content');
        date.innerHTML = allData[allData.length - 1].date;
        temp.innerHTML = allData[allData.length - 1].temperature;
        content.innerHTML = allData[allData.length - 1].response;
    } catch (error) {
        console.log('error', error);
    }
};