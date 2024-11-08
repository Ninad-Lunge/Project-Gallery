import React from 'react';
import { FaHome, FaUser, FaCalendarPlus, FaStream, FaPencilAlt, FaRegFileCode  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="m-2 h-min w-64 bg-black flex flex-col items-center justify-start p-2 rounded-lg">

      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/')}>
        <FaHome className="mr-4" /> Home
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/category')}>
        <FaCalendarPlus className="mr-4" /> Manage Categories
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/tags')}>
        <FaStream className="mr-4" /> Manage Tags
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/technology')}>
        <FaRegFileCode className="mr-4" /> Manage Technologies
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/testimonial')}>
        <FaPencilAlt className="mr-4" /> Mange Testimonials
      </button>

      <hr className="bg-white w-40 my-4" />

      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/profile')}>
        <FaUser className="mr-4" /> Profile
      </button>
    </div>
  );
};

export default VerticalNavbar;