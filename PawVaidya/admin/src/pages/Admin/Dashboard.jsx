import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
const Dashboard = () => {
  const { atoken, getdashdata, dashdata } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getdashdata()
    }
  }, [atoken])
  return dashdata && (
    <div className='m-5'>
      <div className='flex-1 md:flex md:flex-wrap md:gap-2'>
        <div className='flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-12' src="https://www.vhv.rs/dpng/d/416-4162657_people-icon-green-hd-png-download.png" alt="" />
          <div>
            <p className='text-md font-semibold text-gray-500'>{dashdata.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src="https://thumbs.dreamstime.com/b/appointment-calendar-date-icon-green-vector-sketch-well-organized-simple-use-commercial-purposes-web-printing-any-type-243330702.jpg" alt="" />
          <div>
            <p className='text-md font-semibold text-gray-500'>{dashdata.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10' src="https://cdn0.iconfinder.com/data/icons/green-eco-icons/115/eco_pet-01-512.png" alt="" />
          <div>
            <p className='text-md font-semibold text-gray-500'>{dashdata.patients}</p>
            <p className='text-gray-400'>PetsCount</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-12' src="https://cdn-icons-png.flaticon.com/512/4685/4685242.png" alt="" />
          <div>
            <p className='text-md font-semibold text-gray-500'>{dashdata.canceledAppointmentCount}</p>
            <p className='text-gray-400'>Cancelled Appointment</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-12' src="https://e7.pngegg.com/pngimages/914/745/png-clipart-cross-on-a-red-circle-red-cross-on-red-fork-thumbnail.png" alt="" />
          <div>
            <p className='text-md font-semibold text-gray-500'>{dashdata.completedAppointmentCount}</p>
            <p className='text-gray-400'>Completed Appointment</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { title: 'Latest Booking 🪺', data: dashdata.latestAppointments },
          { title: 'Latest Cancelling 🪺', data: dashdata.cancelledAppointments },
          { title: 'Latest Completed 🪺', data: dashdata.completedAppointments }
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
          >
            <div
              className="text-center text-white py-4 rounded-t-lg"
              style={{
                background: `#88D66A`
              }}
            >
              <h3 className="font-bold text-lg">{section.title}</h3>
            </div>
            <div className="divide-y">
              {section.data.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-6 py-4 gap-4 hover:bg-gray-100 transition"
                >
                  <img
                    className="w-12 h-12 rounded-full border"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{item.docData.name}</p>
                    <p className="text-gray-500">{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard