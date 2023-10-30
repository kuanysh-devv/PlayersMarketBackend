const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors')
const { routes } = require('./src/routes')

// Connect to the database
mongoose.connect('mongodb://localhost:27017/mevnshop');

// App initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
});

// App routes
const PORT = 3000;
app.listen(PORT);
console.log(`Server running at ${PORT}`);
