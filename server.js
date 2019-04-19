const dbConnection = require('./server/db/connect');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const controllers = require('./server/controllers');
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json());
app.use(controllers);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
});