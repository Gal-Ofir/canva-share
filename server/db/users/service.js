const model = require('./users');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const insertUser = (user) => {
    return model.create(user, {returning: true});
};

const getUserByIp = (ip) => {
    return model.findOne({
        where: {
            ip: ip
        }
    });
};

const updateBoardByIp = (ip, boardId) => {
    return new Promise((resolve, reject) => {
        return getAllBoards()
            .then((boards) => {
                return !boards.includes(boardId);
            })
            .then(cont => {
                if (cont) {
                    return getUserByIp(ip);
                }
                return false;
            })
            .then(user => {
                if (user) {
                    const {boards_owned} = user;
                    boards_owned.boards.push(boardId);
                    model.update({
                        boards_owned
                    }, { where : {ip: ip}})
                        .then(() => resolve())
                        .catch(err => reject(err));
                }
            }).catch(err => reject(err));
    });
};

const incrementShapesCreatedByIp = (ip) => {
    return model.update({
            shapes_created: sequelize.literal('shapes_created + 1')
        },
        {
            where: {ip: ip},
            returning: true
        });
};

const resetShapesCreatedForAllUsers = () => {
    return model.sequelize.getQueryInterface().bulkUpdate('users', {shapes_created: 0}, {});
};

const isUserOwnerByIp = (ip, boardId) => {
    return getUserByIp(ip).then(user => {
        const {boards_owned} = user;
        return boards_owned.boards.includes(boardId);
    });
};

const deleteUserByIp = (ip) => {
    return model.destroy({
        where: {
            ip: ip
        }
    });

};

const getAllBoards = () => {
    return new Promise((resolve, reject) => {
        return model.findAll({
            where: {
                shapes_created: {
                    [Op.gte]: 0
                }
            }
        })
            .then(response => {
                let boards = [];
                response.forEach(response => {
                    boards = boards.concat(response.get('boards_owned').boards);
                });
                resolve(boards);
            })
            .catch(err => reject(err));
    });
};


const service = {
    insertUser,
    isUserOwnerByIp,
    getUserByIp,
    deleteUserByIp,
    updateBoardByIp,
    incrementShapesCreatedByIp,
    resetShapesCreatedForAllUsers,
    getAllBoards
};

module.exports = service;