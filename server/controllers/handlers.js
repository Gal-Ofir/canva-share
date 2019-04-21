const shapeService = require('../db/shapes');
const userService = require('../db/users');
const hash = require('../utils/hash');

const addShape = (req, res) => {

    shapeService.insertShape(req.body)
        .then(() => {
            res.json({status: 200, message: "success"})
        })
        .catch(err => res.json({status: 200, error: err.message}));
    userService.incrementShapesCreatedByIp(req.ip);
    if (req.body.shouldAddBoard) {
        addBoardToUser(req);
    }
};

const addBoardToUser = (req, res) => {
    userService.updateBoardByIp(req.ip, req.body.board_id)
        .then(response => {
            if (res) {
                res.json(response);
            }
        });
};

const getShapesByBoardId = (req, res) => {
    shapeService.getShapesByBoardId(req.params.boardId)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json({status: 200, error: err.message}));
};

const createUser = (req, res) => {
    const user = {
        ip: req.ip,
        boards_owned: {
            boards: []
        },
        shapes_created: 0
    };
    userService.insertUser(user)
        .then(() => {
            let response = {...user.dataValues, identifier: hash(req.ip)};
            res.json(response);
        })
        .catch(err => res.json({status: 200, error: err.message}));
};

const getUserByIp = (req, res) => {
    userService.getUserByIp(req.ip)
        .then(response => {
            if (!response) {
                res.json(null);
            }
            else {
                response = {...response.dataValues, identifier: hash(req.ip)};
                res.json(response);
            }
        })
        .catch(err => res.json({status: 200, error: err.message}));
};

const getAllBoards = (req, res) => {
    userService.getAllBoards()
        .then(boards => res.json(boards))
        .catch(err => res.json({status: 200, error: err.message}));

};

const deleteBoardByBoardId = (req, res) => {
    shapeService.deleteShapesByBoardId(req.params.boardId)
        .then(() => res.json({status: 200, message: "success"}))
        .catch(err => res.json({status: 200, error: err.message}));
};

module.exports = {deleteBoardByBoardId, addShape, getShapesByBoardId, createUser, getUserByIp, getAllBoards};