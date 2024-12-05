import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { atoken, appointments, cancelappointment, getallappointments } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  const [searchText, setSearchText] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    if (atoken) {
      getallappointments();
    }
  }, [atoken, getallappointments]);

  useEffect(() => {
    if (appointments) {
      const lowerCaseSearchText = searchText.toLowerCase();
      const filtered = appointments.filter((item) =>
        item.userData.name.toLowerCase().includes(lowerCaseSearchText)
      );
      setFilteredAppointments(filtered);
    }
  }, [searchText, appointments]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-green-600">All Appointments 🐿️</h2>
        <p className="text-sm text-gray-500">Manage all the appointments here.</p>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by pet owner's name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-green-50"
          >
            {/* Pet Owner Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.userData.image}
                alt=""
                className="w-16 h-16 rounded-full bg-gray-100"
              />
              <div>
                <div className="flex flex-rows gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">{item.userData.name}</h3>
                  <button className="text-xs border border-green-700 rounded-full bg-green-200 pr-2 pl-2">
                    Pet Owner
                  </button>
                </div>
                <p className="text-sm text-gray-500">{item.userData.pet_type}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <p className="text-sm text-gray-500">
              <strong>Pet Category:</strong> {item.userData.category}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Pet Breed:</strong> {item.userData.breed}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Pet Age:</strong> {item.userData.pet_age}
            </p>
            <p className="text-sm text-gray-500 flex flex-col">
              <div>
                <strong>Booking Detail:</strong> {slotDateFormat(item.slotDate)}, {item.slotTime}
              </div>
            </p>
            <div className="text-gray-500">--------------------------</div>
            <p className="text-xs text-gray-500">Doctor Info</p>
            {/* Doctor Info */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src={item.docData.image}
                alt=""
                className="w-12 h-12 rounded-full bg-gray-100"
              />
              <p className="text-sm text-gray-800">{item.docData.name}</p>
            </div>
            <div className="flex flex-row gap-3 text-xs relative top-2">
              <p className="text-xs text-gray-500 border border-green-500 rounded-full pr-2 pl-2 bg-green-200">
                {item.docData.address.Location}
              </p>
              <p className="text-xs text-gray-500 border border-green-500 rounded-full pr-2 pl-2 bg-green-200">
                {item.docData.address.line}
              </p>
            </div>

            {/* Fee and Actions */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-bold text-gray-800">₹{item.amount}</p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelappointment(item._id)}
                  className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-200"
                  src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png"
                  alt="Cancel Appointment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
