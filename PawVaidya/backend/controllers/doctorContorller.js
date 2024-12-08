import doctorModel from "../models/doctorModel.js"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
export const changeavailablity = async (req , res) => {
    try {
        const { docId } = req.body
        const docdata = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId , {available: !docdata.available})
        res.json({success: true , 
            message:'Availablity changed'
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,
            message: error.message
        })
    } 
}
export const doctorslist = async (req , res) => {
    try{
        const doctors = await doctorModel.find({}).select(['-password' , '-email'])
        res.json({
            success: true,
            doctors
        })
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const logindoctor = async (req , res) => {
    try {
        const { email , password } = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const isMatch = await argon2.verify(doctor.password , password)

        if(isMatch){
            const token = jwt.sign({id: doctor._id} , process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        else{
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

export const appointmentsDoctor = async (req , res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.json({ success: false, message: "Doctor ID is required." });
        }

        // Fetch all appointments for the given doctor ID
        const appointments = await appointmentModel.find({ docId });

        // Initialize counters and arrays for tracking appointments
        let earnings = 0;
        const cancelledAppointments = [];
        const completedAppointments = [];
        const latestAppointments = [];

        // Iterate through the appointments to calculate earnings and segregate data
        appointments.forEach((item) => {
            // Calculate earnings for completed appointments
            if (item.isCompleted) {
                earnings += item.amount || 0; // Default to 0 if `amount` is undefined
                completedAppointments.push(item);
            }

            // Track canceled appointments
            if (item.cancelled) {
                cancelledAppointments.push(item);
            }

            // Add all appointments to the latest list
            latestAppointments.push(item);
        });

        // Collect unique patient IDs
        const patients = new Set();
        appointments.forEach((item) => {
            patients.add(item.userId.toString()); // Ensure `userId` is handled as a string
        });

        // Prepare dashboard data
        const dashData = {
            appointments: appointments.length, // Total number of appointments
            patients: patients.size, // Unique patient count
            latestAppointments: latestAppointments.reverse(), // Reverse for latest first
            latestCancelled: cancelledAppointments.reverse(), // Latest canceled appointments
            earnings, // Total earnings from completed appointments
            canceledAppointmentCount: cancelledAppointments.length, // Total canceled appointments count
            completedAppointmentCount: completedAppointments.length, // Total completed appointments count
        };

        // Send the response with dashboard data
        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: error.message });
    }
};



export const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available , about , full_address , experience , docphone} = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available , about , full_address , experience , docphone})

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default changeavailablity