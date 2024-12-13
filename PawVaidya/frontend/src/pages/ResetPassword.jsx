import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const {backendurl} = useContext(AppContext)
  axios.defaults.withCredentials = true
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (value.length > 1) {
      e.target.value = value[0];
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    pasteData.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    setOtp(pasteData);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Please enter a valid email address.");
    }
    try {
      const { data } = await axios.post(backendurl + '/api/user/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true);
    toast.success('Otp Verified Successfully')
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendurl + '/api/user/reset-password' , {email , otp , password})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login-form')
    } catch (error) {
      toast.error(error.message)
    }
    console.log("Password reset successfully");
    navigate('/login-form');
  };

  return (
    <div className="flex items-center justify-center pt-40">
      {!isEmailSent && (
        <div className="flex flex-col md:flex-row gap-4 border p-10 border-green-400 rounded-2xl">
          <img
            className="hidden md:block md:w-96 md:h-80"
            src="https://media.istockphoto.com/id/1394153813/vector/the-concept-of-a-man-thinking-behind-a-laptop.jpg?s=612x612&w=0&k=20&c=fMj349PwZHepjl5oC59n5tutOdhblY9KULoNP-mqPck="
            alt="Man thinking behind a laptop"
          />
          <form
            onSubmit={handleEmailSubmit}
            className="bg-green-400 p-8 rounded-lg shadow-xl w-full md:w-96 text-sm"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Verify Your Email
            </h2>
            <p className="text-sm text-green-50 mb-6 text-center">
              Enter your registered email ID
            </p>
            <div className="mb-4 flex items-center gap-3 w-full bg-green-300 px-5 py-2.5 rounded-full shadow-sm">
              <img
                className="w-6 h-6"
                src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                alt="Gmail Icon"
              />
              <input
                className="bg-transparent outline-none p-2 flex-grow text-white placeholder-green-100"
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="w-full py-3 rounded-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-all duration-300">
              Submit
            </button>
          </form>
        </div>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <div className="flex flex-col md:flex-row gap-4 border p-10 border-green-400 rounded-2xl">
          <img
            className="hidden md:block md:w-96 md:h-80"
            src="https://media.istockphoto.com/id/1392703407/vector/the-concept-of-a-man-thinking-behind-a-laptop.jpg?s=612x612&w=0&k=20&c=48uoApmijk9ZSiJYzWv7ha5USM0CyZFT21fpzeivCLI="
            alt="Man thinking behind a laptop"
          />
          <form
            className="bg-green-400 p-8 rounded-lg shadow-xl w-full md:w-96 text-sm"
            onSubmit={handleOtpSubmit}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Verify The OTP
            </h2>
            <p className="text-sm text-green-50 mb-6 text-center">
              Enter the 6-digit code
            </p>
            <div
              onPaste={(e) => handlePaste(e)}
              className="flex justify-between mb-8 gap-2"
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-12 h-12 bg-white text-gray-800 text-center text-xl rounded-md shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-md transition-all duration-300">
              Submit
            </button>
          </form>
        </div>
      )}

      {isEmailSent && isOtpSubmitted && (
        <div className="flex flex-col md:flex-row gap-4 border p-10 border-green-400 rounded-2xl">
          <img
            className="hidden md:block md:w-96 md:h-80"
            src="https://t3.ftcdn.net/jpg/05/16/73/48/360_F_516734897_d62wWr4x348x7ZlQcb8OtLhEa4YjPv69.jpg"
            alt="Man thinking behind a laptop"
          />
          <form
            className="bg-green-400 p-8 rounded-lg shadow-xl w-full md:w-96 text-sm"
            onSubmit={handlePasswordSubmit}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Enter New Password
            </h2>
            <p className="text-sm text-green-50 mb-6 text-center">
              Enter new password below
            </p>
            <div className="mb-4 flex items-center gap-3 w-full bg-green-300 px-5 py-2.5 rounded-full shadow-sm">
              <img
                className="w-6 h-6"
                src="https://cdn-icons-png.flaticon.com/512/891/891399.png"
                alt="Password Icon"
              />
              <input
                className="bg-transparent outline-none p-2 flex-grow text-white placeholder-green-100"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full py-3 rounded-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-all duration-300">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
