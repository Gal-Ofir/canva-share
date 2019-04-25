/** /db/users/users.js
 *  Define ORM for users table, model users is used to handle CRUD operations.
 */

const Sequelize = require('sequelize');
const sequelize = require('../connect');
class users extends Sequelize.Model {}

users.init({
    ip: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    boards_owned: {
        type: Sequelize.JSONB,
        allowNull: false
    },
    shapes_created: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {sequelize});

module.exports = users;