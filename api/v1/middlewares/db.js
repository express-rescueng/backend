// db.js
import { Sequelize } from 'sequelize';
import utils from '../config/config.js';

const { dbUrl } = utils;

const sequelize = new Sequelize(dbUrl);

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database'))
    .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;
