/** /db/shapes/service.js
 *  database service for shapes table
 */

const model = require('./shapes');

/**
 * Create shape
 * @param {object} shape - user data
 * @return {Promise} promise that holds operation output (data/error message)
 */
const insertShape = (shape) => {
    return model.create(shape);
};

/**
 * Get all shapes for boardId
 * @param {string} boardId - boardId
 * @return {Promise} promise that holds operation output (array(object)/error message)
 */
const getShapesByBoardId = (boardId) => {
    return model.findAll({
        where: {
            board_id: boardId
        }
    });
};

/**
 * Delete all shapes for boardId
 * @param {string} boardId - boardId
 * @return {Promise} promise that holds operation output (success/error message)
 */
const deleteShapesByBoardId = (boardId) => {
    return model.destroy({
        where: {
            board_id: boardId
        }
    });

};

const service = {
    insertShape,
    getShapesByBoardId,
    deleteShapesByBoardId
};

module.exports = service;