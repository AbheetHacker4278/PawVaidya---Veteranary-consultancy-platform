import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import assets from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r md:w-72"> {/* Always visible, no hiding */}
      {/* Sidebar Items */}
      <div className="flex flex-col">
        {
          atoken && <ul className="text-[#515151] md:mt-5">
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/admin-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/all-appointments'}>
              <img src={assets.appointment_icon} alt="" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/add-doctor'}>
              <img src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/doctor-list'}>
              <img src={assets.people_icon} alt="" />
              <p className='hidden md:block'>Doctor List</p>
            </NavLink>
          </ul>
        }
        {
          dtoken && <ul className="text-[#515151] mt-5">
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/doctor-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/doctor-appointments'}>
              <img src={assets.appointment_icon} alt="" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-4 border-green-400' : ''}`} to={'/doctor-profile'}>
              <img src={assets.people_icon} alt="" />
              <p className='hidden md:block'>Profile</p>
            </NavLink>
          </ul>
        }
      </div>
    </div>
  );
};

export default Sidebar;
