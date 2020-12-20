// Local Variables
const projectData = [];

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

//Get
app.get('/', (req, res) => res.send('Get Received'));
app.get('/all', (req, res) => res.send(projectData));
