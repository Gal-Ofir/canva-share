require('./server/db/connect'); //initialize db connection and load env variables
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

app.get('/:boardId', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/config/max', function(req, res) {
   res.json({maxShapes: process.env.MAX_SHAPES});
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('update_board', (data) => {
        console.log('update board', data);
        const {board} = data;
        const newShape = data.data;
        socket.emit(board, newShape);
    });
});

server.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
});
