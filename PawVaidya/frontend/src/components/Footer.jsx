import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left Div */}
            <div>
                <img className='mb-5 w-40 ' src="https://i.ibb.co/R2Y4vBk/Screenshot-2024-11-23-000108-removebg-preview.png" alt="" />
                <p className='w-full md:w-2/3 text-green-600 leading-6'>Monitor your pet's food portions to avoid obesity. Ask your vet for a diet plan if unsure.</p>
            </div>
            {/* Center Div */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-green-600 cursor-pointer'>
                    <li onClick={()=>navigate('/')}>Home</li>
                    <li onClick={()=>navigate('/about')}>About us</li>
                    <li onClick={()=>navigate('/contact')}>Contact Us</li>
                    <li onClick={()=>navigate('/privacy-policy')}>Privacy Policy</li>
                    <li onClick={()=>navigate('/faqs')}>FaQs</li>
                </ul>
            </div>
            {/* Right Div */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in Touch</p>
                <ul className='flex flex-col gap-2 text-green-600'>
                    <li>+919999999999</li>
                    <li>aseth9588@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* Coyright */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ Pawvaidya - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer