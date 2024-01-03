const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        const existingUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (existingUser) {
            return res.send('User already exists');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Passwords do not match');
        }

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            phone: req.body.phone,
            NIN: req.body.NIN,
            email: req.body.email,
            verified: false,
        });

        req.session.user = user;
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email, id: user.id }, utils.sec_key, {
            expiresIn: "1h",
        });

        req.session.loggedIn = true;
        res.redirect("/");
    } catch (error) {
        console.error(error);
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
