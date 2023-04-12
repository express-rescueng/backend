// Import the User model
import User from './user.js';

console.log('Creating user...');
const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone: 1234567890,
    NIN: 1234567890,
});

console.log('Saving user...');
user.save()
    .then(() => {
        // User saved successfully
        console.log('User saved successfully');
    })
    .catch((error) => {
        // Error saving user
        console.log('Error saving user:', error.message);
    });


// // Validate the user's password
// user.validatePassword('password123')
//     .then((isValid) => {
//         // Password is valid
//         console.log('Password is valid:', isValid);
//     })
//     .catch((error) => {
//         // Error validating password
//         console.log('Error validating password:', error.message);
//     });
