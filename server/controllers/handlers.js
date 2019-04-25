/** controllers/handlers.js
 *  Controllers handling logic
 */

const shapeService = require('../db/shapes');
const userService = require('../db/users');
const hash = require('../utils/hash');

/**
 * Handler for adding shapes to database. if req.body.shouldAddBoard is true, also add that board as owned by the user
 * who initiated the request
 * @param {object} req - request from client
 * @param {object?} res - result to send back, generic success/error message
 */
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

/**
 * Handler for adding board to be owned by the user who initiated the request
 * @param {object} req - request from client
 * @param {object?} res - result to send back, generic success/error message
 */
const addBoardToUser = (req, res) => {
    userService.updateBoardByIp(req.body.ip, req.body.board_id)
        .then(response => {
            if (res) {
                res.json(response).end();
            }
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
};

/**
 * Handler for getting shapes for a certain board, by boardId.
 * @param {object} req - request from client
 * @param {object} res - result to send back, shapes for board
 */
const getShapesByBoardId = (req, res) => {
    shapeService.getShapesByBoardId(req.params.board_id)
        .then(response => {
            res.json(response).end()
        })
        .catch(err => res.json({status: 200, error: err.message}).end());
};

/**
 * Handler for creating a new user.
 * @param {object} req - request from client
 * @param {object?} res - result to send back, user data (identifier, boards_owned, shapes_created)
 */
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
            if (res) {
                res.json(response.dataValues).end();
            }
            else {
                return response.dataValues;
            }
        })
        .catch(err => {
            if (res) {
                res.json({status: 200, error: err.message}).end();
            }
        });
};

/**
 * Handler for getting user by the identifier stored in his browser's localStorage
 * @param {object} req - request from client
 * @param {object} res - result to send back, user data (identifier, boards_owned, shapes_created)
 */
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

/**
 * Handler for determining whether user is owner of a certain board or not
 * @param {object} req - request from client
 * @param {boolean} res - result to send back
 */
const isUserManager = (req, res) => {
    const {ip, boardId} = req.query;
    userService.isUserOwnerByIp(ip, boardId)
        .then(response => {
            res.json(response).end();
        })
        .catch(err => res.json({status: 200, error: err.message}).end());

};

/**
 * Handler for getting all boardIds from database
 * @param {object} req - request from client
 * @param {array} res - result to send back, [board_ids]
 */
const getAllBoards = (req, res) => {
    userService.getAllBoards()
        .then(boards => res.json(boards).end())
        .catch(err => res.json({status: 200, error: err.message}).end());

};

/**
 * Handler for deleting board by board_id
 * @param {object} req - request from client
 * @param {object} res - result to send back, generic success/error message
 */
const deleteBoardByBoardId = (req, res) => {
    shapeService.deleteShapesByBoardId(req.params.board_id)
        .then(() => res.json({status: 200, message: "success"}).end())
        .catch(err => res.json({status: 200, error: err.message}).end());
};

/**
 * Handler for getting a users limit (by ip).
 * Created in order to reduce number of ajax calls made
 * @param {object} req - request from client
 * @param {object} res - result to send back, {shapes_created: number, maxShapes: number}
 */
const getUserLimits = (req, res) => {
    const {force} = req.query;
    const maxShapes = parseInt(process.env.MAX_SHAPES);
    userService.getUserByIp(req.params.ip)
        .then(response => {
            if (!response) {
                // force create user if not found
                if (force) {
                    createUser(req)
                        .then((user) => {
                            res.json({shapes_created: user.shapes_created, maxShapes}).end();
                        });
                }
            }
            else {
                res.json({shapes_created: response.dataValues.shapes_created, maxShapes}).end();
            }
        })
        // return fallback values on error
        .catch(() => res.json({shapes_created: 0, maxShapes}).end());
};

module.exports = {
    isUserManager,
    deleteBoardByBoardId,
    addShape,
    getShapesByBoardId,
    createUser,
    getAllBoards,
    getUserByIdentifier,
    getUserLimits
};