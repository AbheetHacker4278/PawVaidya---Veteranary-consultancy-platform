import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Emailverify = () => {
  const { userdata, backendurl, token, loaduserprofiledata, isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  // State to hold OTP value
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);

  // Handle OTP input change
  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on the next input if applicable
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    const newOtp = paste.split("").concat(Array(6 - paste.length).fill(""));
    setOtp(newOtp);
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join('');
      const { data } = await axios.post(backendurl + '/api/user/verify-account', { otp: otpString }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        loaduserprofiledata();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Redirect if already verified or logged in
  useEffect(() => {
    if (userdata?.isAccountverified) navigate('/');
  }, [isLoggedin, userdata, navigate]);

  const isOtpComplete = otp.every(digit => digit.length === 1); // Check if all OTP fields are filled

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-zinc-100 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify your email</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the 6-digit code sent to <span className="font-medium">{userdata.email}</span>
        </p>

        <form onSubmit={onSubmitHandler}>
          <div className="flex gap-2 mb-6 justify-center" onPaste={handlePaste}>
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (otpRefs.current[index] = el)}
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isOtpComplete}
            className={`w-full py-2 px-4 rounded-lg ${isOtpComplete ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emailverify;
