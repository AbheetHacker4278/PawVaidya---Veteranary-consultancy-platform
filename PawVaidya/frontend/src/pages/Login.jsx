import React, { useContext, useEffect, useState } from 'react';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendurl, token, settoken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    state: '',
    district: '',
    terms: false,
  });

  const allowedStates = ['NEW DELHI', 'GUJARAT', 'HARYANA', 'MUMBAI'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password, state, district } = formData;

    // Validate state
    if (!allowedStates.includes(state.toUpperCase())) {
      toast.error("State must be one of: NEW DELHI, GUJARAT, HARYANA, or MUMBAI.");
      return;
    }

    try {
      const { data } = await axios.post(backendurl + '/api/user/register', {
        name,
        password,
        email,
        state,
        district,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        settoken(data.token);
        toast.success("Registration successful!");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-300 bg-clip-text text-transparent">
              Welcome to PawVaidya!
            </h1>
            <p className="text-gray-600">Access expert advice for your furry friends</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              icon="👤"
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Your email or username"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                name="state"
                placeholder="State"
                value={formData.state.toUpperCase()}
                onChange={handleInputChange}
                icon="📍"
              />
              <FormInput
                type="text"
                name="district"
                placeholder="District"
                value={formData.district.toUpperCase()}
                onChange={handleInputChange}
                icon="🏢"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-emerald-300 text-white py-4 rounded-xl font-semibold 
                       hover:from-green-400 hover:to-green-500 transition-all duration-300 
                       transform hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            >
              Create Account<span className='text-xl'>🦥</span>
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a onClick={() => navigate('/login-form')} className="text-[#2A9D8F] font-medium hover:text-[#238276] cursor-pointer">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
