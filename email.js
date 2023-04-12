"use strict";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'ellsworth86@ethereal.email', // sender address
        to: "ellsworth86@ethereal.email", // list of receivers
        subject: "Hello ✔ here is your otp", // Subject line
        text: `please use this code to verify your email ${otpCode}`, // plain text body
        html: `<b>${otpCode}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
