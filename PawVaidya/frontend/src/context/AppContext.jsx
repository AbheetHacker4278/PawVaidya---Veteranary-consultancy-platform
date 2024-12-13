import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {


    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin , setisLoggedin] = useState(false)
    const [doctors , setdoctors] = useState([])
    const [token , settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)
    const [userdata , setuserdata] = useState(false)


    
    const getAuthstate = async () => {
        try{
            const { data } = await axios.get(backendurl + '/api/user/is-auth')
            if(data.success){
                setisLoggedin(true)
                loaduserprofiledata()
            }
        }catch(error){
            toast.error(error.message)
        }
    }


    const getuserdata = async () => {
        try {
            const {data} = await axios.get(backendurl + '/api/user/data')
            data.success ? setuserdata(data.userdata) : toast.error(data.message)
        } catch (error) {
            toast.error(data.message)
        }
    }


    
    const getdoctorsdata = async () => {
        try {
            const {data} = await axios.get(backendurl + '/api/doctor/list')
            if(data.success){
                setdoctors(data.doctors)
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const loaduserprofiledata = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/get-profile' , {headers:{token}})
            if(data.success){
                setuserdata(data.userdata)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    const value = {
        doctors, getdoctorsdata,
        token , settoken,
        backendurl,userdata,
        setuserdata,
        loaduserprofiledata,
        isLoggedin , setisLoggedin,
        getuserdata
    }
    useEffect(() => {
        getAuthstate()
    } , [])
    
    useEffect(() => {
        getdoctorsdata()
    } , [])

    useEffect(() => {
        if(token){
            loaduserprofiledata()
        }else{
            setuserdata(false)
        }
    } , [token])
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

