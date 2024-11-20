import { motion } from 'framer-motion';
import { useState } from 'react'
import Input from '../components/Input';
import { User , Mail , Lock , Pin , PinOff , Loader} from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';
  
const SignUpPage = () => {

  const [name , setname] = useState('');
  const [password , setpassword] = useState('');
  const [email , setemail] = useState('');
  const [state , setstate] = useState('');
  const [district , setdistrict] = useState('');
  const navigate = useNavigate()

  const { signup , error , isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();

    try{
        await signup(email , password , name , state , district);
        navigate("/verify-email");
    }catch(error){
      console.log(error)
    }
  }
  return (
    <motion.div 
      initial = {{opacity: 0 , y: 20}}
      animate = {{opacity: 1, y:0 }}
      transition={{duration: 0.5}}
      className='max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter 
      backdrop-blur-xl rounded-2xl shadow-xl 
      overflow-hidden '
    >
      <div className='p-8'>
        <h2 
          className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400
        to-pink-500 text-transpare bg-clip-text text-white'>
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          <Input
          icon={User}
          type='text' 
          placeholder='Full Name'
          value={name}
          onChange={(e) => setname(e.target.value)}
          />

          <Input
          icon={Mail}
          type='email' 
          placeholder='Email Address'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          />

          <Input
          icon={Lock}
          type='password' 
          placeholder='Password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          />

          <Input
          icon={Pin}
          type='text' 
          placeholder='State'
          value={state}
          onChange={(e) => setstate(e.target.value)}
          />

          <Input
          icon={PinOff}
          type='text' 
          placeholder='District'
          value={district}
          onChange={(e) => setdistrict(e.target.value)}
          />
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <PasswordStrengthMeter password={password}/>

          <motion.button
          className="mt-5 w-full py-3 bg-gradient-to-r to-orange-600 text-white
          font-bold rounded-lg 
          shadow-lg hover: from-pink-600
          hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 
          focus:ring-offset-2 
          focus: ring-offset-gray-900 transition duration-200
          border border-white "
          whileHover={{scale : 1.02}}
          whileTap={{scale : 0.98}}
          type='submit'
          disabled={isLoading}
          >
            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50
      flex justify-center text-white">
        <p>
          Already Have an Account? {" "}
          <Link to={"/login"} className="text-red-400 hover:underline">Log in
          </Link>
        </p>
      </div>
    </motion.div >
  )
}

export default SignUpPage