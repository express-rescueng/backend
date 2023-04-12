import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    NIN: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
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
