import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import assets from '../assets/assets_frontend/assets'
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MyProfile = () => {
  const apiKey = import.meta.env.VITE_API_KEY || "AIzaSyCQuejQ2bIvTYqtNXsXpMjzWAw9zfYpeKo";
  const modelName = import.meta.env.VITE_MODEL_NAME || "gemini-1.5-flash";
  const prompt = import.meta.env.VITE_PROMPT || "Daily Tips for Pets and Pet Owners in a helpful and positive way. Provide one line of advice.";

  const { userdata, setuserdata, token, backendurl, loaduserprofiledata } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setimage] = useState(false);
  const [dailyQuote, setDailyQuote] = useState("Loading...");

  const updateuserprofiledata = async () => {
    try {
      const formdata = new FormData()
      formdata.append('name', userdata.name)
      formdata.append('phone', userdata.phone)
      formdata.append('address', JSON.stringify(userdata.address))
      formdata.append('full_address', userdata.full_address)
      formdata.append('gender', userdata.gender)
      formdata.append('dob', userdata.dob)
      formdata.append('pet_type', userdata.pet_type)
      formdata.append('pet_gender', userdata.pet_gender)
      formdata.append('breed', userdata.breed)
      formdata.append('category', userdata.category)
      formdata.append('pet_age', userdata.pet_age)


      image && formdata.append('image', image)

      const { data } = await axios.post(
        `${backendurl}/api/user/update-profile`,
        formdata,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message)
        await loaduserprofiledata()
        setIsEdit(false)
        setimage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const setupDailyContentGeneration = async () => {
    try {
      if (!apiKey || !modelName) {
        console.error("API key or model name is missing");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);

      // Generate content function
      const generateContent = async () => {
        try {
          const model = await genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          setDailyQuote(result.response.text || "No content available.");
        } catch (error) {
          console.error("Error generating content:", error);
          setDailyQuote("Failed to load daily content.");
        }
      };

      // Generate content immediately
      await generateContent();
    } catch (error) {
      console.error("Error setting up daily content generation:", error);
    }
  };

  // Initialize daily content on component mount
  useEffect(() => {
    setupDailyContentGeneration();
  }, []);

  return userdata && (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        {
          isEdit ?
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userdata.image} alt="" />
                <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setimage(e.target.files[0])} type="file" id="image" hidden />
            </label> :
            <img
              src={userdata.image}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
        }
        {isEdit ? (
          <input
            type="text"
            className="text-lg font-semibold border border-gray-300 rounded-lg p-2 mb-2"
            value={userdata.name}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-xl font-bold">{userdata.name}</h1>
        )}
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => {
            if (isEdit) {
              updateuserprofiledata();
            } else {
              setIsEdit(true); // Enable edit mode
            }
          }}
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong>Phone:</strong>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.phone}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.phone}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Email:</strong>
            <p>{userdata.email}</p>
          </div>
          <div className="flex justify-between">
            <strong>Address:</strong>
            {isEdit ? (
              <div>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 block mb-2"
                  value={userdata.address?.Location?.toUpperCase()} // Display value in uppercase
                  placeholder="State"
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, Location: e.target.value}, // Convert to uppercase on change
                    }))
                  }
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  value={userdata.address?.Line?.toUpperCase()} // Display value in uppercase
                  placeholder="District"
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, Line: e.target.value}, // Convert to uppercase on change
                    }))
                  }
                />
              </div>

            ) : (
              <p>
                {userdata.address.LOCATION}, {userdata.address.LINE}
              </p>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <strong>Full Address:</strong>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={userdata.full_address}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, full_address: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.full_address}</p>
            )}
          </div>

        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">Basic Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong>Gender:</strong>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.gender}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userdata.gender}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Date of Birth:</strong>
            {isEdit ? (
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.dob}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pet Information */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">Pet Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong>Pet Type:</strong>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.pet_type}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, pet_type: e.target.value }))
                }
              >
                <option value="Small Animal">Small Animal</option>
                <option value="Marine Animal">Marine Animal</option>
                <option value="Large Animal">Large Animal</option>
                <option value="Military Animal">Military Animal</option>
              </select>
            ) : (
              <p>{userdata.pet_type}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Gender:</strong>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.pet_gender}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, pet_gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userdata.pet_gender}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Breed:</strong>
            {isEdit ? (
              <input
                placeholder="Breed Name"
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.breed}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, breed: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.breed}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Pet Category:</strong>
            {isEdit ? (
              <input
                placeholder="Pet Category"
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.category}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.category}</p>
            )}
          </div>
          <div className="flex justify-between">
            <strong>Pet Age:</strong>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={userdata.pet_age}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, pet_age: e.target.value }))
                }
              />
            ) : (
              <p>{userdata.pet_age}</p>
            )}
          </div>
        {/* Details Section */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Daily Tips</h2>
          <div className="flex justify-between ">
            <p>{dailyQuote}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
