import express from 'express';

import {registeruser , loginUser, getprofile, updateprofile, bookappointment, listAppointment, cancelAppointment,sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetpassword, getuserdata, logout } from '../controllers/userController.js';
import authuser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

export const userRouter = express.Router()

userRouter.post('/register' , registeruser)
userRouter.post('/login' , loginUser)
userRouter.post('/logout' , logout)
userRouter.get('/get-profile' ,authuser, getprofile)
userRouter.post('/update-profile' ,upload.single('image'), authuser,updateprofile)
userRouter.post('/book-appointment' , authuser , bookappointment)
userRouter.get("/appointments", authuser, listAppointment)
userRouter.post("/cancel-appointment", authuser, cancelAppointment)
userRouter.post("/send-verify-otp", authuser, sendVerifyOtp)
userRouter.post("/verify-account", authuser, verifyEmail)
userRouter.get("/is-auth", authuser, isAuthenticated)
userRouter.post("/send-reset-otp", sendResetOtp)
userRouter.post("/reset-password", resetpassword)
userRouter.get("/data", authuser, getuserdata)

export default userRouter