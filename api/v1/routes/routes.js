import express from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { login, register, logout } from '../controllers/authController.js';
import AppController from '../views/index.js';
import verifyEmail from '../views/verifyEmail.js';
import verifyOtp from '../controllers/verifyOTP.js';
import dp from '../views/verifyEmail.js';
import uploadFile from '../controllers/uploadController.js';
import home from '../views/home.js';
const router = express.Router();

//define routes
router.get('/', AppController.auth);
// router.get('/verifyEmail', verifyEmail.verify);
router.post('/verifyOtp', asyncHandler(verifyOtp));
router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.get('/logout', asyncHandler(logout));
router.get('/uploadDp', dp.uploadFile);
router.post('/upload', asyncHandler(uploadFile));
router.get('/home', home.index);


export default router;
