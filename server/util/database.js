require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequilize');

const sequilize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    sequilize
};