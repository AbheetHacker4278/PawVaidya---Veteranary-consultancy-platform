import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const ReleatedDoctors = ({speciality , docId , location , State}) => {
    const [relDoc , setRelDoc] = useState([])
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate();
    useEffect(() => {
        if(doctors.length > 0 && speciality && location && State){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId && doc.address.Location === location && doc.address.line === State)
            setRelDoc(doctorsData)
            console.log(doctorsData)
        }
    } , [doctors , speciality , docId , location , State])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
      <h1 className='text-3xl font-medium'>Releated Doctors from Your Location</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extenive list of trusted doctors.</p>
      {relDoc.length > 0 ? (
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {relDoc.slice(0 , 5).map((item , index)=>( 
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0 , 0)}} className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
              <img className='bg-green-50' src={item.image} />
              <div className='p-4 '>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <div className='flex flex-row text-lg font-sm gap-3'>
                  <p className='text-gray-600 border-2 rounded-sm bg-green-100 pl-1'>{item.address.Location}</p>
                  <p className='text-gray-600 border-2 rounded-sm bg-green-100 pl-1'>{item.address.line}</p>
                </div>
                <p className='text-gray-600 text-sm '>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-green-400 px-4 sm:px-10'>🦥 No Other Doctor🦦 <br /> Available from  "{State}" <br /> for <br /> "{speciality}" <br /></p>
      )}
    </div>
  )
}

export default ReleatedDoctors
