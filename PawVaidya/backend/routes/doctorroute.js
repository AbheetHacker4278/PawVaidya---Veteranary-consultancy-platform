import express from 'express';
import {appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorProfile, doctorslist, logindoctor, updateDoctorProfile}  from '../controllers/doctorContorller.js';
import { authDoctor } from '../middleware/authDoctor.js';
import upload from '../middleware/multer.js';

export const doctorrouter = express.Router()

doctorrouter.get('/list' , doctorslist)
doctorrouter.post('/login' , logindoctor)
doctorrouter.get('/appointments' , authDoctor , appointmentsDoctor)
doctorrouter.post('/complete-appointment' , authDoctor , appointmentComplete)
doctorrouter.post('/cancel-appointment' , authDoctor , appointmentCancel)
doctorrouter.get('/dashboard' , authDoctor , doctorDashboard) 
doctorrouter.get('/profile' , authDoctor , doctorProfile) 
doctorrouter.post('/update-profile' , upload.single('image') , authDoctor , updateDoctorProfile) 

