/** /db/shapes/shapes.js
 *  Define ORM for shapes table, model shapes is used to handle CRUD operations.
 */

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
    shape: {
        type: Sequelize.STRING,
        allowNull: false
    },
    board_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    radius: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {sequelize});

module.exports = shapes;