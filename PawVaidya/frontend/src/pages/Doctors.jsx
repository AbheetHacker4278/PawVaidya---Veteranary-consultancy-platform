import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showfilter, setshowfilter] = useState(false);
  const [location, setLocation] = useState(''); // Track selected location
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate();

  const applyFilter = () => {
    console.log('Applying filter for speciality:', speciality);
    console.log('Selected location:', location);
    console.log('Doctors:', doctors);

    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter(doc =>
        doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    if (location) {
      filtered = filtered.filter(doc =>
        doc.address?.Location.toLowerCase() === location.toLowerCase()
      );
    }

    console.log('Filtered Doctors:', filtered);
    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, location]); // Re-run the filter when speciality or location changes

  const handleLocationFilter = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <div>
      <div className="relative ">
        <p className="text-medium font-medium center text-center">Select Your Location</p>
        <div className="flex justify-center">
          <select
            className="border-2 rounded-md p-2 bg-green-300 text-center hover:bg-green-200 hover:transition-all duration-300"
            value={location}
            onChange={(e) => handleLocationFilter(e.target.value)}
          >
            <option value="">Select Location</option>
            {['New Delhi', 'Haryana', 'Mumbai', 'Gujarat'].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button className={`py-1 px-3 border border-green-400 rounded text-sm transition-all justify-center text-center sm:hidden ${showfilter ? 'bg-green-400 text-white' : ''}`} onClick={() => setshowfilter(prev => !prev)}>Filters</button>
        <p className='text-gray-600 text-center'>Browse through the veterinary's speciality.</p>
        <div className={`flex flex-col sm:flex-row item-start gap-5 mt-5 ${showfilter ? 'flex' : 'hidden sm:flex'}`}>
          <div className='flex flex-col gap-4 text-sm text-green-600'>
            <p onClick={() => speciality === 'Marine vet' ? navigate('/doctors') : navigate('/doctors/Marine vet')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${speciality === "Marine vet" ? "bg-indigo-100 text-black" : ""}`}>Marine vet</p>
            <p onClick={() => speciality === 'Small animal vet' ? navigate('/doctors') : navigate('/doctors/Small animal vet')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${speciality === "Small animal vet" ? "bg-indigo-100 text-black" : ""}`}>Small animal vet</p>
            <p onClick={() => speciality === 'Large animal vet' ? navigate('/doctors') : navigate('/doctors/Large animal vet')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${speciality === "Large animal vet" ? "bg-indigo-100 text-black" : ""}`}>Large animal vet</p>
            <p onClick={() => speciality === 'Military vet' ? navigate('/doctors') : navigate('/doctors/Military vet')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${speciality === "Military vet" ? "bg-indigo-100 text-black" : ""}`}>Military vet</p>
          </div>
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
            {filterDoc.length > 0 ? (
              filterDoc.map(item => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                  key={item._id}
                >
                  <img className="bg-green-50" src={item.image} alt={item.name} />
                  <div className="p-4">
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                      <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                    <div className="flex flex-row text-lg font-sm gap-3">
                      <p className="text-gray-600 border-2 rounded-sm bg-green-100 p-1">
                        {item.address?.Location || 'Unknown Location'}
                      </p>
                      <p className='text-gray-600 border-2 rounded-sm bg-green-100 p-1'>{item.address.line}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No doctors found for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
