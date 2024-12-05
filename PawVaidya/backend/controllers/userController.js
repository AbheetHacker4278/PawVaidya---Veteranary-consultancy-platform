import validator from 'validator';
import argon2 from 'argon2';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import { v2 as coludinary} from 'cloudinary';
import appointmentModel from '../models/appointmentModel.js';

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

        const userdata = {
            name,
            email,
            password: hashedpass,
            state: state.toUpperCase(),
            district: district.toUpperCase()
        }

        const newuser = new userModel(userdata)
        const user = await newuser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        } else {
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
        const { userId, name, email, gender, dob, address, phone, full_address, pet_type, pet_age, pet_gender , breed , category } = req.body
        const imagefile = req.file

        if (!name || !email || !gender || !dob || !address || !phone || !full_address || !pet_type || !pet_age || !pet_gender , !breed , !category) {
            return res.json({
                success: false,
                message: "Data Missing"
            })
        }
        await userModel.findByIdAndUpdate(userId, { name, email, gender, dob, address: JSON.parse(address.toUpperCase()), phone, full_address, pet_type, pet_age, pet_gender , breed , category })

        if(imagefile){
            const imageupload = await coludinary.uploader.upload(imagefile.path , {resource_type: 'image'})
            const imageurl = imageupload.secure_url
            
            await userModel.findByIdAndUpdate(userId , {image:imageurl})
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

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

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



export const resetuserpassword = async (req, res) => {
  try {
    const { userId, password} = req.body;

    // Check if userId and password are provided
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID or password is missing",
      });
    }

    // Hash the new password
    const hashedpassword = await argon2.hash(password);

    // Attempt to update the user's password
    const updatedUser = await userModel.findByIdAndUpdate(userId, { password: hashedpassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};



export default registeruser 