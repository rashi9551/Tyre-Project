import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideImage from '../../Assets/Pellon Tyres and Auto Centre _ MOTs Servicing and Repairs in Halifax.jpeg'
import Logo from '../../Assets/logo.png'
import axiosAuthor from '../../services/axios/authorityAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Signup() {
  const [shopName, setname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {data}=await axiosAuthor().post('/signup',{shopName,password,phone})
    console.log(data);
    console.log('Form submitted:', { shopName, phone, password });
    if(data.message==="already authority axists"){
      toast.error("Username Already Exist")
    }else{
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-4"
      >
         <img
          src={Logo}
          alt="Company Logo"
          className="absolute top-6 left-4 w-40 hidden md:block object-contain cursor-pointer"
        />
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Signup and Get an Account!
        </h1>
        <div className=" flex flex-col md:flex-row gap-12">
          <div className="flex-1 flex items-center justify-center">
            <motion.img 
              src={SideImage}
              alt="Signup illustration image" 
              className="w-full max-w-sm rounded-lg "
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <input
                type="text"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setname(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </motion.div>
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md"
            >
              Register Now
            </motion.button>
            <p className="text-center text-gray-600">
              Already a member? <a href="/" className="text-blue-600 hover:underline font-medium">Login here</a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
