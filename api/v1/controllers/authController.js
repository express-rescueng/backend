// auth controller
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import utils from "../config/config.js";
import db from "../middlewares/db.js";
import validationSchema from "../utils/validationSchema.js";
"use strict";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { verifyNumber } from "../../../sms.js";

// async..await is not allowed in global scope, must use a wrapper

// register user
// export const register = async (req, res) => {
//     try {
//         console.log(req.body);
//         const data = req.body;
//         const findAdmin = await User.findOne({ email: data.email });
//         if (findAdmin) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const { error, value } = validationSchema.validate(data);
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }
//         const user = new User(req.body);
//         user.save();
//         const token = jwt.sign({ email: user.email, id: user._id }, utils.sec_key, { expiresIn: "1h" });
//         console.log("pro");
//         res.status(200).json({ result: user, token, message: "User created successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }
//};
export const register = async (req, res) => {
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
    };
    const number = req.body.phone;
    // verifyNumber(number);
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
    //console.log(user);
    user.save();
    //     const html = `
    //     <!DOCTYPE html>
    //     <html>
    //       <head>
    //         <meta charset="UTF-8">
    //         <title>OTP Verification</title>
    //       </head>
    //       <body>
    //         <h1>OTP Verification</h1>
    //         <form action="/verifyOtp" method="POST">
    //           <label for="otp">Enter OTP:</label>
    //           <input type="text" id="otp" name="otp" required>
    //           <button type="submit">Verify</button>
    //         </form>
    //       </body>
    //     </html>
    //   `;
    res.redirect("/");

};

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    if (otp === req.session.otp) {
        res.send('Otp verified');
    } else {
        res.send('invalid otp');
    }
};


// login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exists by email
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // check if password is correct
        const isPasswordCorrect = await bycrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // create token
        const token = jwt.sign({ email: user.email, id: user._id }, utils.sec_key, {
            expiresIn: "1h",
        });
        req.session.loggedIn = true;
        res.redirect("/");
        // res.status(200).json({ result: user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }
};

//log out user
export const logout = async (req, res) => {
    try {
        req.session.destroy();
        //res.status(200).json({ message: "User logged out successfully" });
        console.log("logged out");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
