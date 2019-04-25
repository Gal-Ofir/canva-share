/** /db/users/service.js
 *  database service for users table
 */

const model = require('./users');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

/**
 * Create user
 * @param {object} user - user data
 * @return {Promise} promise that holds operation output (data/error message)
 */
const insertUser = (user) => {
    return model.create(user, {returning: true});
};

/**
 * Get user by identifier (ip)
 * @param {string} ip - identifier
 * @return {Promise} promise that holds operation output (data/error message)
 */
const getUserByIp = (ip) => {
    return model.findOne({
        where: {
            ip: ip
        }
    });
};

/**
 * Update boards_created by identifier (ip) and boardId
 * Used to add new boards to user
 * @param {string} ip - identifier
 * @param {string} boardId - boardId
 * @return {Promise} promise that holds operation output (updated rows + data/error message)
 */
const updateBoardByIp = (ip, boardId) => {
    return new Promise((resolve, reject) => {
        return getAllBoards()
            // first check if board already exists
            .then((boards) => {
                return !boards.includes(boardId);
            })
            // if so then return false, and do not continue update table operation
            // if true, then get user's details and add board
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
                    }, {where: {ip: ip}, returning: true})
                        .then((response) => resolve(response))
                        .catch(err => reject(err));
                }
            }).catch(err => {
                reject(err)
            });
    });
};

/**
 * Increment shapes created count for user, by identifier (ip)
 * @param {string} ip - identifier
 * @return {Promise} promise that holds operation output (data/error message)
 */
const incrementShapesCreatedByIp = (ip) => {
    return model.update({
            shapes_created: sequelize.literal('shapes_created + 1')
        },
        {
            where: {ip: ip},
            returning: true
        });
};

/**
 * Reset shapes created count for all users
 * @return {Promise} promise that holds operation output (data/error message)
 */
const resetShapesCreatedForAllUsers = () => {
    return model.sequelize.getQueryInterface().bulkUpdate('users', {shapes_created: 0}, {});
};

/**
 * Check if user has boardId in his board_owned list
 * @param {string} ip - identifier
 * @param {string} boardId - boardId
 * @return {boolean} whether user is owner or not
 */
const isUserOwnerByIp = (ip, boardId) => {
    if (boardId === "" || !boardId) {
        return false;
    }
    return getUserByIp(ip)
        .then(user => {
        const {boards_owned} = user;
        return boards_owned.boards.includes(boardId);
    });
};

/**
 * Delete user by identifier (ip)
 * @param {string} ip - identifier
 * @return {Promise} promise that holds operation output (success/error message)
 */
const deleteUserByIp = (ip) => {
    return model.destroy({
        where: {
            ip: ip
        }
    });

};

/**
 * Get all board ids
 * @return {Promise} promise that holds operation output (array(object)/error message)
 */
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