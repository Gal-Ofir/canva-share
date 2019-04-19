const Sequelize = require('sequelize');
const sequelize = require('../connect');
class shapes extends Sequelize.Model {}

shapes.init({
    x: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    board_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {sequelize});

module.exports = shapes;