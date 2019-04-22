const shapeService = require('../db/shapes');
const userService = require('../db/users');
const hash = require('../utils/hash');

const addShape = (req, res) => {

    shapeService.insertShape(req.body)
        .then(() => {
            res.json({status: 200, message: "success"}).end();
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
    userService.incrementShapesCreatedByIp(req.body.ip);
    if (req.body.shouldAddBoard) {
        addBoardToUser(req);
    }
};

const addBoardToUser = (req, res) => {
    userService.updateBoardByIp(req.body.ip, req.body.board_id)
        .then(response => {
            if (res) {
                res.json(response).end();
            }
        });
};

const getShapesByBoardId = (req, res) => {
    shapeService.getShapesByBoardId(req.params.board_id)
        .then(response => {
            res.json(response).end()
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
};

const createUser = (req, res) => {
    const identifier = hash(req.ip);
    const user = {
        ip: identifier,
        boards_owned: {
            boards: []
        },
        shapes_created: 0
    };

    userService.insertUser(user)
        .then((response) => {
            res.json(response.dataValues).end();
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
};

const getUserByIdentifier = (req, res) => {
    userService.getUserByIp(req.params.ip)
        .then(response => {
            if (!response) {
                res.json(null).end();
            }
            else {
                res.json(response.dataValues).end();
            }
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
};

const isUserManager = (req, res) => {
    const {ip, boardId} = req.query;
    userService.isUserOwnerByIp(ip, boardId)
        .then(response => {
            res.json(response).end();
        })
        .catch(err => res.json({status: 200, error: err.message}).end());

};

const getAllBoards = (req, res) => {
    userService.getAllBoards()
        .then(boards => res.json(boards).end())
        .catch(err => res.json({status: 200, error: err.message}).end());

};

const deleteBoardByBoardId = (req, res) => {
    shapeService.deleteShapesByBoardId(req.params.board_id)
        .then(() => res.json({status: 200, message: "success"}).end())
        .catch(err => res.json({status: 200, error: err.message}).end());
};

module.exports = {isUserManager, deleteBoardByBoardId, addShape, getShapesByBoardId, createUser, getAllBoards, getUserByIdentifier};