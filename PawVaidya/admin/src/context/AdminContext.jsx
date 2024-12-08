import { createContext, useCallback, useState } from "react";
import axios  from "axios";
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [atoken , setatoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '')
    const [doctors , setdoctors] = useState([])
    const [appointments , setappointments] = useState([])
    const [dashdata , setdashdata] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const getalldoctors = async () => {
        try {
            const {data} = await axios.post(backendurl + '/api/admin/all-doctors' , {} , {headers:{atoken}})
            if(data.success){
                setdoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeavailablity = async (docId) => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/change-availablity' , {docId} , {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getalldoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getallappointments = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/admin/appointments`, {
                headers: { atoken },
            });
            if (data.success) {
                setappointments(data.appointments);
                console.log(data.appointments)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [atoken, setappointments]);

    const cancelappointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { atoken } })

            if (data.success) {
                toast.success(data.message)
                getallappointments()
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
            const { data } = await axios.get(backendurl + '/api/admin/dashboard' , {headers : {atoken}})
            if(data.success){
                setdashdata(data.dashdata)
                console.log(data.dashdata)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    

    const value = {
        atoken , setatoken , 
        backendurl , doctors,
        getalldoctors,changeavailablity,
        appointments,setappointments,
        getallappointments,cancelappointment,
        dashdata , getdashdata
    }

    return (
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider