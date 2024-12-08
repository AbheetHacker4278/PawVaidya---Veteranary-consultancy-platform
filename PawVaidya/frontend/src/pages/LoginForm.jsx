import React, { useContext, useState } from 'react'
import FormInput from '../components/FormInput'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from "react-toastify"
import axios from "axios"

const LoginForm = () => {
    const { backendurl , token , settoken , setisLoggedin} = useContext(AppContext)
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    try {
      const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        settoken(data.token);
        toast.success("Login successful!");
        setisLoggedin(true)
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br">
        <div className="relative w-full max-w-lg">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-200 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-green-500 rounded-full animate-pulse delay-500"></div>
          <img 
            src="https://i.ibb.co/N2dwZpC/1fc8fd8a-8ea8-4383-9bb0-3cf75b23cdc4-removebg-preview-1.png" 
            alt="Veterinary Care"
            className="relative z-10 max-w-full h-auto rounded-3xl"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full p-8">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r  from-green-500 to-emerald-300 bg-clip-text text-transparent">
              Welcome Back to PawVaidya!
            </h1>
            <p className="text-gray-600">Access expert advice for your furry friends</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <FormInput
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleInputChange}
              icon="📧"
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon="🔒"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <p onClick={() => navigate('/reset-password')} className="text-sm text-[#2A9D8F] hover:text-[#238276] cursor-pointer">
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r  from-green-400 to-emerald-300 text-white py-4 rounded-xl font-semibold 
                       hover:from-green-400 hover:to-green-500 transition-all duration-300 
                       transform hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            >
              Login<span className='text-xl'>🦥</span>
            </button>

            <p className="text-center text-sm text-gray-600">
              New here?{' '}
              <a onClick={() => navigate('/login')} className="text-[#2A9D8F] font-medium hover:text-[#238276] cursor-pointer">
                Sign Up
              </a>
              {' '}to connect with trusted vets.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm