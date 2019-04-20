const model = require('./shapes');

const insertShape = (shape) => {
    return model.create(shape);
};

const getShapesByBoardId = (boardId) => {
    return model.findAll({
        where: {
            board_id: boardId
        }
    });
};

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