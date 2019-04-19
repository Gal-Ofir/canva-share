const model = require('./users');
const sequelize = require('sequelize');

const insertUser = (user) => {
    return model.create(user);
};

const getUserByIp = (ip) => {
    return model.findOne({
        where: {
            ip: ip
        }
    });
};

const updateBoardByIp = (ip, boardId) => {
    return getUserByIp(ip)
        .then(user => {
            const {boards_owned} = user;
            boards_owned.boards.push(boardId);
            return model.update({
                    boards_owned
                },
                {
                    where: {ip: ip},
                    returning: true
                });
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
    // return model.sequelize.getQueryInterface().bulkUpdate({
    //     shapes_created: 0
    // });
};

const isIpOwner = (ip, boardId) => {
  getUserByIp(ip).then(user => {

  });
};

const deleteUserByIp = (ip) => {
    return model.destroy({
        where: {
            ip: ip
        }
    });

};


const service = {
    insertUser,
    deleteUserByIp,
    getUserByIp,
    deleteUserByIp,
    updateBoardByIp,
    incrementShapesCreatedByIp,
    resetShapesCreatedForAllUsers
};

module.exports = service;