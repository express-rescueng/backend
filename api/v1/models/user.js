//user models db schema
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import utils from '../config/config.js';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const sec_key = utils.sec_key;

//user schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    NIN: {
        type: Number,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    verified: { type: Boolean, default: false, required: false },

    date: { type: Date, default: Date.now } //default value
});

// Before saving the user, hash their password
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// Static method to authenticate a user based on their phone and password
UserSchema.statics.authenticate = function (email, password) {
    return this.findOne({ email })
        .then((user) => {
            if (!user) {
                throw new Error('User not found');
            }
            return bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    throw new Error('Invalid password');
                }
                return user;
            });
        })
        .catch((err) => {
            return Promise.reject(err.message);
        });
};

const User = mongoose.model('User', UserSchema);

export default User;