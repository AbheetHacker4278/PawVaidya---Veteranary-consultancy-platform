import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
    const { dtoken, profileData, setProfileData, getProfileData, backendurl } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available,
                full_address: profileData.full_address,
                experience: profileData.experience,
                docphone: profileData.docphone
            };

            const { data } = await axios.post(backendurl + '/api/doctor/update-profile', updateData, {
                headers: { dtoken },
            });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (dtoken) {
            getProfileData();
        }
    }, [dtoken]);

    return (
        profileData && (
            <div className="bg-gray-50 min-h-screen p-6 ">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-primary"
                            src={profileData.image}
                            alt="Doctor"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-700">{profileData.name}</h2>
                            <p className="text-gray-500 mt-2">{profileData.degree} - {profileData.speciality}</p>
                            <span className="bg-primary text-zinc-600 text-xs px-2 py-1 rounded-full mt-1 inline-block border bg-green-200">
                                {profileData.experience}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end relative bottom-36">
                        {/* Show bell notification only if phone number is missing */}
                        {!profileData.docphone && (
                            <div className="relative bg-teal-100 p-2 rounded-lg group cursor-pointer">
                                <svg
                                    className="w-8 h-8 text-green-600 animate-wiggle"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 21 21"
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
                                    />
                                </svg>
                                <div className="hidden group-hover:block px-1 py-0.5 bg-teal-100 text-zinc-700 min-w-5 rounded-full text-center text-xs absolute -top-2 -end-28 translate-x-1/4 text-nowrap">
                                    <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-auto h-full"></div>
                                    Please add your phone number
                                </div>
                            </div>
                        )}
                    </div>



                    {/* Profile Details */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* About Section */}
                        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-medium text-gray-700 mb-2">About</h3>
                            {isEdit ? (
                                <textarea
                                    onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    rows={6}
                                    value={profileData.about}
                                />
                            ) : (
                                <p className="text-gray-600">{profileData.about}</p>
                            )}
                        </div>

                        {/* Appointment Fee & Address */}
                        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Details</h3>
                            <p className="text-gray-600">
                                <strong>Fee: </strong>
                                ₹{isEdit ? (
                                    <input
                                        type="number"
                                        onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                                        className="w-24 border border-gray-300 rounded-lg px-2"
                                        value={profileData.fees}
                                    />
                                ) : (
                                    profileData.fees
                                )}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Address: </strong>
                                {isEdit ? (
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    address: { ...prev.address, Location: e.target.value },
                                                }))
                                            }
                                            className="border border-gray-300 rounded-lg px-2"
                                            value={profileData.address.Location}
                                        />
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    address: { ...prev.address, line: e.target.value },
                                                }))
                                            }
                                            className="border border-gray-300 rounded-lg px-2"
                                            value={profileData.address.line}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {profileData.address.Location}, {profileData.address.line}
                                    </>
                                )}
                            </p>
                            <p className="text-gray-600 pt-2">
                                <strong> Phone: +91 </strong>
                                {isEdit ? (
                                    <input
                                        type="number"
                                        onChange={(e) => setProfileData((prev) => ({ ...prev, docphone: e.target.value }))}
                                        className="w-24 border border-gray-300 rounded-lg px-2 "
                                        value={profileData.docphone}
                                    />
                                ) : (
                                    profileData.docphone
                                )}
                            </p>
                        </div>
                    </div>
                    {/* Full Address Section */}
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm mt-8">
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Full Address</h3>
                        {isEdit ? (
                            <textarea
                                onChange={(e) => setProfileData((prev) => ({ ...prev, full_address: e.target.value }))}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                rows={6}
                                value={profileData.full_address}
                            />
                        ) : (
                            <p className="text-gray-600">{profileData.full_address}</p>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="mt-6 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={profileData.available}
                            onChange={() =>
                                isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
                            }
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="text-gray-700">Available for Appointments</label>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4">
                        {isEdit ? (
                            <button
                                onClick={updateProfile}
                                className="bg-primary text-zinc-800 px-6 py-2 rounded-lg shadow hover:bg-primary-dark"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEdit((prev) => !prev)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default DoctorProfile;
