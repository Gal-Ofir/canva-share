const root = require('app-root-path');
require('dotenv').config({path: root + '\\.env'});

const Sequelize = require('sequelize');
const dbConfig = JSON.parse((process.env.NODE_ENV === 'production') ? process.env.DB_CONFIG : process.env.DEV_DB_CONFIG);
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    logging: false,
    native: false,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log(`Connection to database ${dbConfig.database} established, env: ${process.env.NODE_ENV}`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        throw new Error(err);
    });

module.exports = sequelize;