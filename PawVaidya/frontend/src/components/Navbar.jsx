import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import assets from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, settoken, userdata, backendurl, setuserdata, setisLoggedin } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)


  const Logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendurl + '/api/user/logout', { headers: token })
      data.success && setisLoggedin(false)
      data.success && setuserdata(false)
      data.success && settoken(false)
      data.success && localStorage.removeItem('token')
      navigate('/')
    } catch (error) {
      toast.error(error.message);
    }
  }

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/send-verify-otp`,
        {},
        {
          headers: { token }, // Include headers properly
        }
      );

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-green-400'>
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src="https://i.ibb.co/R2Y4vBk/Screenshot-2024-11-23-000108-removebg-preview.png" alt='' />
      <ul className='hidden md:flex items-start gap-5 font-medium text-green-500'>
        <NavLink to='/'>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to='/doctors'>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to='/about'>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to='/contact'>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink>
          {!userdata.isAccountverified && (
            <p
              onClick={sendVerificationOtp}
              className="hover:text-red-400 cursor-pointer text-red-500 border border-red-500 p-1 rounded-full"
            >
              Verify Email
            </p>
          )}
        </NavLink>

      </ul>
      <div className="flex items-center gap-4">
        {token && userdata ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userdata.image}
              alt=""
            />
            <img
              className="w-2.5"
              src="https://cdn-icons-png.flaticon.com/512/60/60995.png"
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-emerald-500 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-green-100 flex flex-col gap-4 p-4 rounded-3xl">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={Logout}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-400 text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login-form')}
              className="bg-green-400 text-white px-8 py-3 rounded-full font-light md:block"
            >
              Login
            </button>
          </>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src="https://www.freeiconspng.com/thumbs/menu-icon/menu-icon-18.png" alt="" />
        {/* Mobile Menu Update */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img onClick={() => navigate('/')} className='w-36' src="https://i.ibb.co/R2Y4vBk/Screenshot-2024-11-23-000108-removebg-preview.png" alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-5 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'> <p className='px-4 py-2 rounded inline-block'>Home</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'> <p className='px-4 py-2 rounded inline-block'>All Doctors</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'> <p className='px-4 py-2 rounded inline-block'>About</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'> <p className='px-4 py-2 rounded inline-block'>Contact</p> </NavLink>
            <div>
              {!userdata.isAccountverified && (
                <p
                  onClick={sendVerificationOtp}
                  className="cursor-pointer text-red-500 border border-red-500 p-1.5 rounded-full "
                >
                  Verify Email
                </p>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar