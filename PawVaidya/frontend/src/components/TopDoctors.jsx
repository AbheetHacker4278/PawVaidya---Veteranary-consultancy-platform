import { useContext } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
      <h1 className='text-3xl font-medium'>This Our Top Doctors from India</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extenive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
            <img className='bg-green-50' src={item.image} />
            <div className='p-4 '>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <div className='flex flex-row text-lg font-sm gap-3'>
                <p className='text-gray-600 border-2 rounded-sm bg-green-100 p-1/4 text-sm'>{item.address.Location}</p>
                <p className='text-gray-600 border-2 rounded-sm bg-green-100 p-1/4 text-sm'>{item.address.line}</p>
              </div>
              <p className='text-gray-600 text-sm '>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#a8d5ba] text-gray-600 px-12 py-3 rounded-full mt-10'>
        More</button>
    </div>
  )
}

export default TopDoctors