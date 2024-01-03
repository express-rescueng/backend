const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler.js');
const { login, register, logout } = require('../controllers/authController.js');
const AppController = require('../views/index.js');
const verifyEmail = require('../views/verifyEmail.js');  // Corrected this line
const verifyOtp = require('../controllers/verifyOTP.js');
const uploadFile = require('../controllers/uploadController.js');
const home = require('../views/home.js');
const router = express.Router();

// Define routes
router.get('/', AppController.auth);
// router.get('/verifyEmail', verifyEmail.verify);
router.post('/verifyOtp', asyncHandler(verifyOtp));
router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.get('/logout', asyncHandler(logout));
router.get('/uploadDp', verifyEmail.verify);  // Corrected this line
router.post('/upload', asyncHandler(uploadFile));
router.get('/home', home.index);

module.exports = router;
