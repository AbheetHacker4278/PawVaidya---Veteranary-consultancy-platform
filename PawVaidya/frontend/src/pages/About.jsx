import React from 'react'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>Us🦥</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12 border border-green-300 rounded-3xl'>
        <img className='w-full md:max-w-[360px] p-3' src="https://i.ibb.co/6Wzk9nP/DALL-E-2024-11-24-18-06-17-A-cheerful-veterinarian-surrounded-by-various-animals-including-dogs-cats.webp" alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-green-600 p-3'>
          <p>Welcome to PawVaidya, your trusted partner in managing your pets' healthcare needs conveniently and efficiently. We are committed to providing comprehensive care solutions for your furry friends, ensuring their well-being at every step.</p>
          <p>At PawVaidya, we understand the unique challenges pet owners face when it comes to scheduling veterinary appointments and keeping track of their pets' health records. Our platform is designed to make these tasks easy and hassle-free, so you can focus on what matters most – your pet's health and happiness.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>With PawVaidya, you can manage your pets' healthcare needs with just a few clicks, ensuring they receive the best possible care at the right time. Let us help you take the stress out of veterinary care and provide the convenience you deserve.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p className='text-gray-700 font-semibold'>Why <span></span> Choose Us 🦥</p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-200 hover:text-gray-500 transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-200 hover:text-gray-500 transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>Convenience</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-200 hover:text-gray-500 transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>Personalization</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About