import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home  from "./pages/Home"
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickChat from './pages/QuickChat'
import LoginForm from './pages/LoginForm'
import FAQS from './pages/faqs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
   <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:speciality' element={<Doctors />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login-form' element={<LoginForm />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/my-appointments' element={<MyAppointments />} />
      <Route path='/appointment/:docId' element={<Appointments />} />
      <Route path='/quick-chats' element={<QuickChat />} />
      <Route path='/faqs' element={<FAQS />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
    <Footer />
   </div>
  )
}

export default App