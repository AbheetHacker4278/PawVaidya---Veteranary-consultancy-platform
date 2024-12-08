import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-semibold'>Us🦥</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src="https://i.ibb.co/NtvwQcH/DALL-E-2024-11-24-19-28-28-A-cheerful-veterinarian-surrounded-by-various-animals-including-dogs-cats.webp" alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-green-600'>Our Office</p>
          <p className='text-gray-500'>Vit Bhopal , astha Sehore , <br /> Madhya pradesh</p>
          <p className='text-gray-500'>Tel: (91) 9999999999 <br /> Email: aseth9588@gmail.com</p>
          <p className='font-semibold text-lg text-green-600'>Career At PawVaidya</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-green-400 px-8 py-4 text-sm hover:bg-green-300 rounded-full'>Send Enquiry</button>
        </div>
      </div>
    </div>
  )
}

export default Contact