import React, { useContext, useEffect, useState, useRef } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Camera, MapPin, Phone, Clock, CreditCard, Edit2, Save } from 'lucide-react';

const DoctorProfile = () => {
    const { dtoken, profileData, setProfileData, getProfileData, backendurl } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData((prev) => ({
                    ...prev,
                    tempImage: e.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('docId', profileData._id);
            formData.append('fees', profileData.fees);
            formData.append('address', JSON.stringify(profileData.address));
            formData.append('available', profileData.available);
            formData.append('about', profileData.about);
            formData.append('full_address', profileData.full_address);
            formData.append('experience', profileData.experience);
            formData.append('docphone', profileData.docphone);

            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const { data } = await axios.post(
                `${backendurl}/api/doctor/update-profile`,
                formData,
                { headers: { dtoken } }
            );

            if (data.success) {
                toast.success('Profile updated successfully');
                setIsEdit(false);
                setSelectedImage(null);
                getProfileData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (dtoken) {
            getProfileData();
        }
    }, [dtoken]);

    if (!profileData) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-visible p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-green-100">
                                <img
                                    className="w-full h-full object-cover"
                                    src={profileData.tempImage || profileData.image}
                                    alt={profileData.name}
                                />
                            </div>
                            {isEdit && (
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Camera className="w-6 h-6 text-white" />
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                            <p className="text-gray-500 mt-1">{profileData.degree} · {profileData.speciality}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    {profileData.experience}
                                </span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => isEdit ? updateProfile() : setIsEdit(true)}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {isEdit ? (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>

                    {/* Availability Toggle */}
                    <div className="mt-6 flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox"
                                className="sr-only peer"
                                checked={profileData.available}
                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                disabled={!isEdit}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                        <span className="text-sm text-gray-600">Available for Appointments</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* About Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                        {isEdit ? (
                            <textarea
                                className="w-full min-h-[200px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                                value={profileData.about}
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                            />
                        ) : (
                            <p className="text-gray-600 whitespace-pre-wrap">{profileData.about}</p>
                        )}
                    </div>

                    {/* Contact & Details */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact & Details</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-gray-400" />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">Consultation Fee:</span>
                                    {isEdit ? (
                                        <input
                                            type="number"
                                            className="w-24 p-1 rounded border border-gray-200"
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                        />
                                    ) : (
                                        <span className="font-medium">₹{profileData.fees}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">Phone:</span>
                                    {isEdit ? (
                                        <input
                                            type="tel"
                                            className="w-32 p-1 rounded border border-gray-200"
                                            value={profileData.docphone}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, docphone: e.target.value }))}
                                        />
                                    ) : (
                                        <span className="font-medium">+91 {profileData.docphone}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                <div className="flex-1">
                                    <span className="text-gray-600">Address:</span>
                                    {isEdit ? (
                                        <div className="space-y-2 mt-2">
                                            <input
                                                type="text"
                                                className="w-full p-2 rounded border border-gray-200"
                                                value={profileData.address.Location}
                                                onChange={(e) => setProfileData(prev => ({
                                                    ...prev,
                                                    address: { ...prev.address, Location: e.target.value }
                                                }))}
                                                placeholder="Location"
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 rounded border border-gray-200"
                                                value={profileData.address.line}
                                                onChange={(e) => setProfileData(prev => ({
                                                    ...prev,
                                                    address: { ...prev.address, line: e.target.value }
                                                }))}
                                                placeholder="Street Address"
                                            />
                                        </div>
                                    ) : (
                                        <p className="font-medium mt-1">
                                            {profileData.address.Location}, {profileData.address.line}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Address */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete Address</h2>
                    {isEdit ? (
                        <textarea
                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                            rows={4}
                            value={profileData.full_address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, full_address: e.target.value }))}
                        />
                    ) : (
                        <p className="text-gray-600 whitespace-pre-wrap">{profileData.full_address}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;