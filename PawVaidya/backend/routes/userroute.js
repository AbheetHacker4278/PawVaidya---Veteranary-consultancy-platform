import express from 'express';

import {registeruser , loginUser, getprofile, updateprofile, bookappointment, listAppointment, cancelAppointment, resetuserpassword} from '../controllers/userController.js';
import authuser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

export const userRouter = express.Router()

userRouter.post('/register' , registeruser)
userRouter.post('/login' , loginUser)
userRouter.get('/get-profile' ,authuser, getprofile)
userRouter.post('/update-profile' ,upload.single('image'), authuser,updateprofile)
userRouter.post('/book-appointment' , authuser , bookappointment)
userRouter.get("/appointments", authuser, listAppointment)
userRouter.post("/cancel-appointment", authuser, cancelAppointment)
userRouter.post("/reset-password", authuser, resetuserpassword)

export default userRouter