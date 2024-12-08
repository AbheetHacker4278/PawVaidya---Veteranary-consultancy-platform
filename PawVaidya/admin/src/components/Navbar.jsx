import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const { dtoken, setdtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (dtoken) {
      setdtoken('');
      localStorage.removeItem('dtoken');
    }
    if (atoken) {
      setatoken('');
      localStorage.removeItem('atoken');
    }
  };

  const handleImageClick = () => {
    if (atoken) {
      navigate('/admin-dashboard');
    } else if (dtoken) {
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="flex justify-between items-center px-1 sm:px-10 py-3 border-b bg-zinc-50">
      <div className="flex items-center gap-2 text-xs">
        {/* Wrap the navigate logic in a function */}
        <img
          onClick={handleImageClick}
          className="w-36 sm:w-40 cursor-pointer"
          src="https://i.ibb.co/R2Y4vBk/Screenshot-2024-11-23-000108-removebg-preview.png"
          alt="Dashboard Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 bg-green-100">
          {atoken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-green-400 text-white text-sm px-10 py-2 rounded-full hover:bg-green-200 hover:text-zinc-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
