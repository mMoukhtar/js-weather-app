const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '96d15f9c58b0922548c54c6a9bbbe196';


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

postData('/new', { temperature: 21, date: Date(), response: 'some response' }).then(data => {
    console.log(data);
    getData('/all').then(data => console.log(`all data = ${JSON.stringify(data)}`));
});


