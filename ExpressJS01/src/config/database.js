require ('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
        await sequelize.sync({ alter: true });
        console.log('Database and tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { connection, sequelize };