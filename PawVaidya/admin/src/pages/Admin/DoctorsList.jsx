import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, atoken, getalldoctors, changeavailablity } = useContext(AdminContext)

  // Separate available and not available doctors
  const getDoctorsByAvailability = (isAvailable) => {
    return doctors.filter((doctor) => doctor.available === isAvailable)
  }

  useEffect(() => {
    if (atoken) {
      getalldoctors()
    }
  }, [atoken])

  // Calculate counts
  const availableDoctors = getDoctorsByAvailability(true)
  const notAvailableDoctors = getDoctorsByAvailability(false)

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors 🐿️</h1>

      <div className='pt-5'>
        <h2 className='text-md font-semibold'>
          Available Doctors  ({availableDoctors.length}) 
        </h2>
        <div className='w-full flex flex-wrap gap-4 pt-2 gap-y-6'>
          {availableDoctors.map((item, index) => (
            <div className='border border-emerald-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-green-50 group-hover:bg-green-100 transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <p className='text-zinc-600 text-xs'>{item.email}</p>
                <p className='text-zinc-600 text-xs'>+91 {item.docphone}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeavailablity(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='pt-5'>
        <h2 className='text-md font-semibold'>
          Not Available Doctors ({notAvailableDoctors.length})
        </h2>
        <div className='w-full flex flex-wrap gap-4 pt-2 gap-y-6'>
          {notAvailableDoctors.map((item, index) => (
            <div className='border border-red-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-red-50 group-hover:bg-red-100 transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <p className='text-zinc-600 text-xs'>{item.email}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeavailablity(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
