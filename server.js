// Local Variables

//Dummy End point
const projectData = {
    temperature: 16,
    date: `${Date()}`,
    response: 'Some Dummy Response'
};

// Setup Express as Server
const express = require('express')
const app = express();

// Dependencies
const bodyParser = require('body-parser');
/* middleware */
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Crocs
const cors = require('cors')
app.use(cors());

//Static Files
app.use(express.static('website'));

//Server Configuration
const port = 3000;

//Spin Server
app.listen(port, () => console.log(`Server has been started
    Server is working on http://localhost:${port}`));

// Routing Configuration

//GET route
app.get('/', (req, res) => res.send(projectData));
app.get('/all', (req, res) => res.send(projectData));


//POST route
/* 
The POST route should anticipate receiving three pieces of data from the request body
temperature
date
user response 
*/
app.post('/new', (req, res) => {
    projectData.temperature = req.body.temperature
    projectData.date = req.body.date
    projectData.response = req.body.response
    res.send(projectData);
});



