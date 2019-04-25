require('./server/db/connect'); //initialize db connection and load env variables
const userService = require('./server/db/users');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const controllers = require('./server/controllers');
const port = process.env.PORT || 8080;
const schedule = require('node-schedule');

// Reset shapesCreated every 00:00, Server time
schedule.scheduleJob('45 3 * * *',function(){
    console.log('Reset shapes created count for all users initiated.');
    userService.resetShapesCreatedForAllUsers()
        .then(() => {
            console.log('Shapes reset on', new Date());
        });
});

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use(controllers);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/:boardId', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/config/max', function (req, res) {
    res.json({maxShapes: process.env.MAX_SHAPES});
});

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
});

io.on("connection", socket => {
    socket.on('update_board', (data) => {
        io.emit(data.board_id, data);
    });

    socket.on('delete_board', (data) => {
        io.emit(`delete:${data.board_id}`, data.ip)
    })
});