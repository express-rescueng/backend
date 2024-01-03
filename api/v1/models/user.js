const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const utils = require('../config/config')
const sequelize = new Sequelize(utils.dbUrl, { dialect: 'mysql' }); // Specify the dialect (e.g., 'mysql')

const User = sequelize.define('User', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    NIN: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
});

User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

module.exports = User;
