/** server.js
 *  Main file for server.
 */


require('./server/db/connect'); //initialize db connection and load env variables
const userService = require('./server/db/users');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const controllers = require('./server/controllers');
const port = process.env.PORT || 8080;
const schedule = require('node-schedule');

//setup middleware and serve static files
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

//setup controllers
app.use(controllers);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//required for heroku to properly catch a request for /boardId
app.get('/:boardId', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//max shapes can be configured from the environment variable
app.get('/config/max', function (req, res) {
    res.json({maxShapes: process.env.MAX_SHAPES});
});

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//start up the server
server.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
});


//set up socket interactions between server and client
io.on("connection", socket => {
    socket.on('update_board', (data) => {
        io.emit(data.board_id, data);
    });

    socket.on('delete_board', (data) => {
        io.emit(`delete:${data.board_id}`, data.ip)
    });
});

// Reset shapesCreated every 23:59, Server time, show a message to all online users that shapes were reset
schedule.scheduleJob('23 59 * * *',function(){
    console.log('Reset shapes created count for all users initiated.');
    userService.resetShapesCreatedForAllUsers()
        .then(() => {
            io.emit('reset_shapes');
            console.log('Shapes reset on', new Date());
        });
});