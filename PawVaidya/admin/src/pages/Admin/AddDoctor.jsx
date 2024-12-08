import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const allowedStates = ['NEW DELHI', 'HARYANA', 'GUJARAT', 'MUMBAI'];
  const [docimg, setdocimg] = useState(null);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [experience, setexperience] = useState('1 Year');
  const [fees, setfees] = useState('');
  const [phone, setdocphone] = useState('');
  const [about, setabout] = useState('');
  const [speciality, setspeciality] = useState('Marine vet');
  const [degree, setdegree] = useState('');
  const [state, setstate] = useState('');
  const [district, setdistrict] = useState('');
  const [full_address, setfull_address] = useState('');
  const [error, setError] = useState('');

  const { backendurl, atoken } = useContext(AdminContext);

  // Handle State Validation
  const handleStateChange = (e) => {
    const value = e.target.value.toUpperCase();
    setstate(value);
    if (!allowedStates.includes(value)) {
      setError('Invalid state. Allowed states: NEW DELHI, HARYANA, GUJARAT, MUMBAI.');
    } else {
      setError('');
    }
  };
  const handleStateChange2 = (e) => {
    const value = e.target.value.toUpperCase();
    setdistrict(value);
  };

  // Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docimg) {
      return toast.error('Image not selected');
    }

    try {
      const formdata = new FormData();
      formdata.append('image', docimg);
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('experience', experience);
      formdata.append('fees', fees);
      formdata.append('phone', phone);
      formdata.append('about', about);
      formdata.append('speciality', speciality);
      formdata.append('degree', degree);
      formdata.append('address', JSON.stringify({ Location: state, line: district }));
      formdata.append('full_address', full_address);

      const { data } = await axios.post(`${backendurl}/api/admin/add-doctor`, formdata, {
        headers: { atoken },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setdocimg(null);
        setname('');
        setemail('');
        setpassword('');
        setexperience('1 Year');
        setfees('');
        setabout('');
        setspeciality('Marine vet');
        setdegree('');
        setstate('');
        setdistrict('');
        setfull_address('');
        setdocphone('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">
        Add Doctor <span className="text-xs text-green-400">(Use uppercase for state names)</span>
      </p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input onChange={(e) => setdocimg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload Doctor Image</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          {/* Left Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <p>Doctor Email</p>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <p>Doctor Password</p>
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <p>Doctor Phone Number</p>
              <input
                onChange={(e) => setdocphone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Phone Number +91"
                required
              />
            </div>
            <div>
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setexperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
                <option value="12+ Year">12+ Year</option>
              </select>
            </div>
            <div>
              <p>Doctor Fees</p>
              <input
                onChange={(e) => setfees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                onChange={(e) => setspeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
              >
                <option value="Marine vet">Marine vet</option>
                <option value="Small animal vet">Small animal vet</option>
                <option value="Large animal vet">Large animal vet</option>
                <option value="Military vet">Military vet</option>
              </select>
            </div>
            <div>
              <p>Education</p>
              <input
                onChange={(e) => setdegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div>
              <p>Address</p>
              <input
                onChange={handleStateChange}
                value={state}
                className={`border rounded px-3 py-2 ${error ? 'border-red-500' : ''}`}
                type="text"
                placeholder="State"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <input
                onChange={handleStateChange2}
                value={district}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="District"
                required
              />
            </div>
            <div>
              <p>Full Address</p>
              <textarea
                onChange={(e) => setfull_address(e.target.value)}
                value={full_address}
                className="border rounded px-3 py-2"
                placeholder="Write full address of the doctor"
                rows={4}
                required
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-8">
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setabout(e.target.value)}
            value={about}
            className="w-full px-3 py-2 border rounded"
            placeholder="Write about the doctor"
            rows={5}
            required
          />
          <button
            type="submit"
            className="mt-4 w-32 bg-green-300 text-white text-sm rounded-full py-2 hover:bg-green-400"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
