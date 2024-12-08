import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-6 bg-gradient-to-b  rounded-lg shadow-green-600">
      <header className="flex items-center justify-between mb-6">
        <h1 className=" flex text-3xl font-bold text-green-300 text-center">🦥All Appointments. . .</h1>
      </header>

      <div className="space-y-6">
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition duration-150"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16">
                <img
                  src={item.userData.image}
                  alt="Pet Owner"
                  className="w-full h-full rounded-full object-cover border border-gray-300"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.userData.name}</h2>
                <p className="text-sm text-gray-500">{calculateAge(item.userData.dob)} years old</p>
                <p className="text-sm text-gray-500">+91 {item.userData.phone}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-center md:text-left">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Date & Time</span>
                <span className="text-md font-semibold text-gray-800">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Payment</span>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${item.payment ? 'bg-green-100 text-green-600' : 'bg-green-400 text-white'}`}>
                  {item.payment ? 'Online' : 'Cash'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Fees</span>
                <span className="text-md font-semibold text-gray-800">₹{item.amount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Pet Type</span>
                <span className="text-md font-semibold text-gray-700">{item.userData.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Pet Age</span>
                <span className="text-md font-semibold text-gray-700">{item.userData.pet_age}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className={`text-sm font-semibold ${item.cancelled ? 'text-red-500' : item.isCompleted ? 'text-green-500' : 'text-blue-500'}`}>
                  {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending...'}
                </span>
              </div>
            </div>

            <div className="text-xl font-bold text-gray-500">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;