
const express = require('express');
const app = express();
const session = require('express-session');
const authController = require('../backend/api/v1/controllers/authController');
const utils = require('../backend/api/v1/config/config.js');

app.use(express.json());
app.use(session({ secret: 'your_session_secret', resave: true, saveUninitialized: true }));

module.exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) {
        return res.send('User already exists');
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords do not match');
    }
    const number = req.body.phone;
    req.session.number = number;
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        NIN: req.body.NIN,
        email: req.body.email,
        verified: false,
    });
    req.session.user = user;
    user.save();
    res.redirect("/");
};

module.exports.verifyOtp = async (req, res) => {
    const { otp } = req.body;
    if (otp === req.session.otp) {
        res.send('Otp verified');
    } else {
        res.send('Invalid otp');
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); 
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, utils.sec_key, {
            expiresIn: "1h",
        });
        req.session.loggedIn = true;
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        console.log("logged out");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

app.listen(3000, () => {
    console.log(`Server started on port ${3000}`)
})
