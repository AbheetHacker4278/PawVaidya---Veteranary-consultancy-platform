import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    const { userdata, setuserdata, backendurl, loaduserprofiledata } = useContext(AppContext);
    const token = localStorage.getItem('token')
    const [isEdit, setIsEdit] = useState(true); // Defaulting to edit mode
    const navigate = useNavigate()

    const updateuserprofiledata = async () => {
        try {
            const response = await axios.post(
                `${backendurl}/api/user/reset-password`,
                { password: userdata.password, },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setuserdata(response.data)
                await loaduserprofiledata();
                setIsEdit(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred');
        }
    };

    const password = userdata?.password || '';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br via-white to-green-50 flex-row">
            <div className='hidden md:rounded-xl md:p-8 md:w-full md:max-w-md'>
                <img src="https://i.pinimg.com/originals/d2/f1/3d/d2f13d48f5ec46049f05bf6af098e7e9.png" alt="" />
            </div>
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-green-800 text-center mb-4">
                    Reset Password
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter your registered email or mobile number and your new password to reset it.
                </p>
                <div className="mb-4">
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email or mobile"
                        value={userdata?.email || ''}
                        onChange={(e) =>
                            setuserdata((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) =>
                            setuserdata((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                <button
                    className="w-full p-3 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-400 shadow-md"
                    onClick={async () => {
                        await updateuserprofiledata();
                        navigate('/');
                    }}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
