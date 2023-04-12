import express from 'express';
import router from './api/v1/routes/routes.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configure Express to use sessions
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://oyedeleholaji84:Wordwide@cluster0.p0ujvth.mongodb.net/?retryWrites=true&w=majority',
            collection: 'sessions',
        }),
    })
);
//mount routes
app.use('/', router);

//start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
