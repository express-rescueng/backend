import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import User from './models/nuser.js';

mongoose.connect(
    'mongodb+srv://oyedeleholaji84:Wordwide@cluster0.p0ujvth.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Login/Register Form</title>
    </head>
    <body>
      <h1>Login</h1>
      <form action="/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Login</button>
      </form>
      <hr>
      <h1>Register</h1>
      <form action="/signup" method="POST">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required>
        <br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required>
        <br>
        <label for="NIN">NIN:</label>
        <input type="text" id="NIN" name="NIN" required>
        <br>
        <button type="submit">Register</button>
      </form>
    </body>
  </html>
  `
// Routes
app.get('/', (req, res) => {
    res.send(html);
});

app.post('/register', (req, res) => {
    const existingUser = User.findOne(req.body.email);
    if (existingUser) {
        return res.send('User already exists');
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords do not match');
    }
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        NIN: req.body.NIN,
        email: req.body.email,
    });
    console.log(user);
    user.save();
    res.send('User created');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.authenticate(email, password)
        .then((user) => {
            req.session.userId = user._id;
            res.send('Login successful');
        })
        .catch((err) => {
            console.error(err);
            res.status(401).send('Invalid email or password');
        });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
