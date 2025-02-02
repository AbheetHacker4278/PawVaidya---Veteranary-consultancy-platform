import validator from 'validator';
import argon2 from 'argon2';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import { v2 as coludinary } from 'cloudinary';
import appointmentModel from '../models/appointmentModel.js';
import { transporter } from '../config/nodemailer.js';
import WELCOME_EMAIL from '../mailservice/emailstemplate.js'
import VERIFICATION_EMAIL_TEMPLATE from '../mailservice/emailtemplate2.js'
import { PASSWORD_RESET_REQUEST_TEMPLATE } from '../mailservice/emailtemplate3.js';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from '../mailservice/emailtemplate4.js';
import moment from 'moment';

export const registeruser = async (req, res) => {
    try {
        const { name, email, password, state, district } = req.body

        if (!name || !email || !password || !state || !district) {
            return res.json({
                success: false,
                message: 'Missing Details'
            })
        }
        if (!state.toUpperCase() || !district.toUpperCase()) {
            return res.json({
                success: false,
                message: 'Write State and District in Capital Letter'
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Email Format is not valid'
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Enter Strong Password'
            })
        }
        const hashedpass = await argon2.hash(password)

        const existinguser = await userModel.findOne({ email })

        if (existinguser) {
            return res.json({
                success: false,
                message: "User Already Exist"
            })
        }

        const userdata = {
            name,
            email,
            password: hashedpass,
            state: state.toUpperCase(),
            district: district.toUpperCase()
        }

        const newuser = new userModel(userdata)
        const user = await newuser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 1000
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to PawVaidya',
            html: WELCOME_EMAIL
        }
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            token,
            userdata
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "User Does Not Exist"
            })
        }
        const isMatch = await argon2.verify(user.password, password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
                { expiresIn: '7d' }
            )
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 1000
            })
            res.json({
                success: true,
                token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            // maxAge : 7 * 24 * 60 * 1000
        })
        return res.json({
            success: true,
            message: "Logged Out Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await userModel.findById(userId)
        if (user.isAccountverified) {
            return res.json({ success: false, message: "Account Already verified" })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{otp}', otp)
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Verification OTP sent on Email Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body
    if (!userId || !otp) {
        return res.json({
            success: false,
            message: "Missing Details"
        })
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({
                success: false,
                message: "user Not Found"
            })
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }
        if (user.verifyOtpExpiredAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP Expired"
            })
        }
        user.isAccountverified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiredAt = 0;

        await user.save()
        res.json({
            success: true,
            message: "Email Verified Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const isAuthenticated = (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false, // Change this to `false`
            message: "Email is required"
        });
    }
    try {
        const user = await userModel.findOne({
            email
        })
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        console.log(`Generated OTP for ${email}: ${otp}`); // Only for debugging in dev mode

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_REQUEST_TEMPLATE
                .replace('{otp}', otp)
                .replace('{name}', user.name || 'User') // Default to 'User' if name is missing
        };
        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: "OTP sent to Your Email address successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const resetpassword = async (req, res) => {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
        return res.json({
            success: false,
            message: "Email , OTP , newpassword are required"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }
        if (!user.resetOtp || `${user.resetOtp}` !== `${otp}`) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP Expired"
            })
        }
        const hashedpassword = await argon2.hash(password);
        user.password = hashedpassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
                .replace('{otp}', otp)
                .replace('{name}', user.name)
        };
        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: "Password reset Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Api for user profile data

export const getprofile = async (req, res) => {
    try {
        const { userId } = req.body
        const userdata = await userModel.findById(userId).select('-password')

        res.json({
            success: true,
            userdata
        })
    } catch {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updateprofile = async (req, res) => {
    try {
        const { userId, name, email, gender, dob, address, phone, full_address, pet_type, pet_age, pet_gender, breed, category } = req.body
        const imagefile = req.file

        if (!name || !email || !gender || !dob || !address || !phone || !full_address || !pet_type || !pet_age || !pet_gender, !breed, !category) {
            return res.json({
                success: false,
                message: "Data Missing"
            })
        }
        await userModel.findByIdAndUpdate(userId, { name, email, gender, dob, address: JSON.parse(address.toUpperCase()), phone, full_address, pet_type, pet_age, pet_gender, breed, category })

        if (imagefile) {
            const imageupload = await coludinary.uploader.upload(imagefile.path, { resource_type: 'image' })
            const imageurl = imageupload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageurl })
        }
        res.json({
            success: true,
            message: 'Profile updated successfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


//api for appointment
export const bookappointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Fetch doctor details
        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor is not available' });
        }

        let slots_booked = docData.slots_booked || {};

        // Checking for slot availability
        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.status(400).json({ success: false, message: 'Slot is already booked' });
        }

        // Add slot booking
        slots_booked[slotDate] = slots_booked[slotDate] || [];
        slots_booked[slotDate].push(slotTime);

        // Fetch user details
        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData: { ...docData.toObject(), slots_booked: undefined }, // Excluding slots_booked
            amount: docData.fees,
            slotTime,
            slotDate,
            date: new Date()
        };

        // Save appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();


        // Send confirmation email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: 'Appointment Confirmation',
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9fff9;
            border-radius: 10px;
            position: relative;
        }

        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            margin: -20px -20px 20px -20px;
        }

        .content {
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        li {
            margin: 10px 0;
            padding: 10px;
            background-color: #f0f8f0;
            border-radius: 5px;
        }

        .leaf {
            position: absolute;
            width: 30px;
            height: 30px;
            color: #4CAF50;
        }

        .butterfly {
            position: absolute;
            width: 20px;
            height: 20px;
            color: #8bc34a;
        }

        .paw {
            position: absolute;
            width: 25px;
            height: 25px;
            color: #66bb6a;
        }

        .signature {
            margin-top: 20px;
            text-align: center;
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Appointment Confirmed</h2>
    </div>

    <div class="content">
        <p>Dear ${userData.name},</p>

        <p>Your appointment with <strong>Dr. ${docData.name}</strong> has been successfully booked.</p>

        <p><strong>Details:</strong></p>
        <ul>
            <li><strong>Doctor:</strong> Dr. ${docData.name}</li>
            <li><strong>Date:</strong> ${slotDate}</li>
            <li><strong>Time:</strong> ${slotTime}</li>
            <li><strong>Fee:</strong> ₹${docData.fees}</li>
            <li><strong>Full Address:</strong> ${docData.full_address}</li>
        </ul>

        <p>Thank you for choosing our service. Please arrive on time.</p>

        <div class="signature">
            <p>Best regards,<br/>
            <strong>Pawvaidya Team</strong> 🐾</p>
        </div>
    </div>
</body>
</html>
            `
        };
        await transporter.sendMail(mailOptions);

        // Update doctor's booked slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(200).json({ success: true, message: 'Appointment booked successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


// API to get user appointments for frontend my-appointments page
export const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })


        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//APi for cancle appointment
export const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)



        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const getuserdata = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountverified: user.isAccountverified
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




export default registeruser 