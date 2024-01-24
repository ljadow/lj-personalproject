const express = require('express');
const app = express();
const PORT = 8080;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cookie-parser
const { COOKIE_SECRET } = require('./secrets');
const cookieParser = require('cookie-parser');
app.use(cookieParser(COOKIE_SECRET));

// init cors
const cors = require('cors');
app.use(cors());

// init db client
const client = require('./db/client');
client.connect();

//base route for hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// create router for api
app.use('/api', require('./api'));

//listen to port 8080
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

