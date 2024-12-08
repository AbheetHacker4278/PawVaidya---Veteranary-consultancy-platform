import React, { useContext, useState } from 'react';
import assets from '../assets/assets_admin/assets';
import { MailIcon, LockIcon } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [state, setState] = useState('Admin');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const backendurl = import.meta.env.VITE_BACKEND_URL

  const { setatoken } = useContext(AdminContext);
  const { setdtoken } = useContext(DoctorContext); // Fixed useContext here

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendurl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('atoken', data.token);
          localStorage.removeItem('dtoken', data.token);
          setatoken(data.token);
          setTimeout(() => {
            toast.success(data.message || 'Login successful!');
          }, 100);
        } else {
          toast.error(data.message || 'Admin login failed!');
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dtoken', data.token);
          localStorage.removeItem('atoken', data.token);
          setdtoken(data.token); // Correctly setting the token for doctor
          console.log(data.token);
          setTimeout(() => {
            toast.success(data.message || 'Login successful!');
          }, 100);
        } else {
          toast.error(data.message || 'Doctor login failed!');
        }
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Logo and Illustration */}
      <div className="hidden lg:block lg:w-3/5 bg-[#f8e7d3] relative">
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center">
            <img className="w-44 cursor-pointer" src="https://i.ibb.co/R2Y4vBk/Screenshot-2024-11-23-000108-removebg-preview.png" alt="" />
          </div>
        </div>
        <div className="h-full flex items-center justify-center">
          <img
            src="https://i.ibb.co/N2dwZpC/1fc8fd8a-8ea8-4383-9bb0-3cf75b23cdc4-removebg-preview-1.png"
            alt="Vet with Pets Silhouette"
            className="w-3/5 object-contain"
          />
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-[#97c7b7] rounded-t-[100px]" />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-2/5 bg-[#97c7b7] p-8 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <h3 className="text-3xl font-semibold text-[#f8e7d3] mb-1">to</h3>
            <h1 className="text-4xl font-bold text-white mb-4">PawVaidya</h1>
            <p className="text-[#f8e7d3]">Access expert advice for your furry friends</p>
          </div>

          <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 border border-transparent focus:border-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                  placeholder="Your email or username"
                />
              </div>

              <div className="relative">
                <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 border border-transparent focus:border-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-[#97c7b7] focus:ring-[#97c7b7]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-[#97c7b7] rounded-lg font-semibold hover:bg-[#f8e7d3] transition duration-200"
            >
              Login as {state}
            </button>

            <div className="text-center text-white">
              {state === 'Admin' ? (
                <p>
                  Doctor Login?{' '}
                  <button
                    type="button"
                    onClick={() => setState('Doctor')}
                    className="underline hover:text-[#f8e7d3]"
                  >
                    Click here
                  </button>
                </p>
              ) : (
                <p>
                  Admin Login?{' '}
                  <button
                    type="button"
                    onClick={() => setState('Admin')}
                    className="underline hover:text-[#f8e7d3]"
                  >
                    Click here
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
