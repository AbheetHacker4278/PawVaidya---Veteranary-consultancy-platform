import React, { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorDashboard = () => {
  const { dtoken, dashdata, getdashdata, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  
  // State for search input and filtered appointments
  const [searchInput, setSearchInput] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredCancelledAppointments, setFilteredCancelledAppointments] = useState([]);

  useEffect(() => {
    if (dtoken) {
      getdashdata();
    }
  }, [dtoken]);

  useEffect(() => {
    if (dashdata) {
      // Filter logic based on search input
      const searchFilter = (appointments) => 
        appointments.filter((item) =>
          item.userData.name.toLowerCase().includes(searchInput.toLowerCase())
        );

      setFilteredAppointments(searchFilter(dashdata.latestAppointments));
      setFilteredCancelledAppointments(searchFilter(dashdata.latestCancelled));
    }
  }, [searchInput, dashdata]);

  return dashdata && (
    <div className='m-5'>
      {/* Statistics Section */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-8' src='https://i.ibb.co/BZtjVJp/images-removebg-preview.png' alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>₹{dashdata.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src="https://thumbs.dreamstime.com/b/appointment-calendar-date-icon-green-vector-sketch-well-organized-simple-use-commercial-purposes-web-printing-any-type-243330702.jpg" alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-8' src="https://cdn0.iconfinder.com/data/icons/green-eco-icons/115/eco_pet-01-512.png" alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.patients}</p>
            <p className='text-gray-400'>Pets Info</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-8' src="https://cdn-icons-png.flaticon.com/512/4685/4685242.png" alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.completedAppointmentCount}</p>
            <p className='text-gray-400'>Completed Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-8' src="https://e7.pngegg.com/pngimages/914/745/png-clipart-cross-on-a-red-circle-red-cross-on-red-fork-thumbnail.png" alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.canceledAppointmentCount}</p>
            <p className='text-gray-400'>Canceled Appointments</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='mt-6'>
        <input 
          type="text" 
          className='w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200' 
          placeholder="Search by patient name..." 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
      </div>

      {/* Bookings and Cancelled Appointments Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10'>
        {/* Latest Bookings */}
        <div className='bg-white'>
          <div className='flex items-center gap-2.5 px-4  py-4 rounded-t border'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Bookings 🦥</p>
          </div>
          <div className='pt-6 border border-t-0'>
            {filteredAppointments.slice(0, 5).map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Latest Cancelled */}
        <div className='bg-white'>
          <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Cancelled 🦥</p>
          </div>
          <div className='pt-4 border border-t-0'>
            {filteredCancelledAppointments.slice(0, 5).map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
