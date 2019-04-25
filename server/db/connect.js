/** /db/connect.js
 *  Initialize connection to database, credentials should be stored in
 *  environment variable DEV_DB_CONFIG, DB_CONFIG for development, production environments respectively
 */
const root = require('app-root-path');
require('dotenv').config({path: root + '\\.env'});

// initiate connection
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

// verify connection succeeded
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