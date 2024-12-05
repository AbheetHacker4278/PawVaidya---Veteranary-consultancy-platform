import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [ dtoken , setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments , setAppointments] = useState([])
    const [dashdata , setdashdata] = useState(false)
    const [profileData , setProfileData] = useState(false)


    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/appointments'  , {headers : {dtoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dtoken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getdashdata()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dtoken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // after creating dashboard
                getdashdata()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const getdashdata = async () => {
        try {

            const { data } = await axios.get(backendurl + '/api/doctor/dashboard', { headers: { dtoken } })

            if (data.success) {
                setdashdata(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendurl + '/api/doctor/profile', { headers: { dtoken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const value = {
        dtoken , setdtoken,backendurl ,appointments , setAppointments , getAppointments,
        completeAppointment , cancelAppointment , getdashdata , dashdata , setdashdata ,
        getProfileData , profileData , setProfileData
    }

    return (
        <DoctorContext.Provider value = {value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider