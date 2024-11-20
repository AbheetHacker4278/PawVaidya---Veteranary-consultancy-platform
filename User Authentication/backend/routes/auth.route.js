import express from 'express';
import {signup , login , logout , verifyEmail , forgotpassword , resetpassword , checkAuth} from '../controllers/auth.controller.js';
import {verifytoken} from '../middleware/verifytoken.js';
const router = express.Router(); 

router.get('/check-auth' , verifytoken , checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email' , verifyEmail);
router.post('/forgot-password' , forgotpassword);
router.post('/reset-password/:token' , resetpassword);


export default router 