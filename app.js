
// app.js
import express from 'express';
import router from './api/v1/routes/routes.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import sequelize from './api/v1/middlewares/db.js'; // Import the Sequelize instance

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Express to use sessions with MySQLStore
const sessionStore = new MySQLStore({
    checkExpirationInterval: 900000, // How often expired sessions will be cleared; milliseconds
    expiration: 86400000, // The maximum age (in milliseconds) of a valid session
}, sequelize);

app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

// Mount routes
app.use('/', router);

// Start server
app.listen(utils.port, () => {
    console.log(`Server started on port ${utils.port}`);
});