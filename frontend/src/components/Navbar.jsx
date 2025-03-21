import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const token = localStorage.getItem("token");

  const handleDeleteUser =()=>{
    if(token){
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("role"); // Remove token from localStorage
      navigate("/")
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div className="sticky left-0 top-0 container bg-gray-100 flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black z-10">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-orange-500">Amasia Rice</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        <NavLink to="/">
          <li className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:text-orange-500">
            Home
          </li>
        </NavLink>
        <NavLink to="/sheet">
          <li className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:text-orange-500">
            Sheet
          </li>
        </NavLink>
        {/* <NavLink to="/location">
          <li className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:text-orange-500">
            Location
          </li>
        </NavLink> */}
        
          <li onClick={handleDeleteUser} className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:text-orange-500">
           {
            token ? "Logout":"login"
           }
          </li>
        
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-orange-500 m-4">
          Amasia Rice
        </h1>

        {/* Mobile Navigation Items */}
        <NavLink to="/">
          <li className=" p-4 text-gray-700 border-b rounded-xl hover:bg-orange-500 duration-300 hover:text-white cursor-pointer border-gray-600">
            Home
          </li>
        </NavLink>

        <NavLink to="sheet">
          <li className=" p-4 text-gray-700 border-b rounded-xl hover:bg-orange-500 duration-300 hover:text-white cursor-pointer border-gray-600">
            Sheet
          </li>
        </NavLink>

        {/* <NavLink to="/location">
          <li className=" p-4 text-gray-700 border-b rounded-xl hover:bg-orange-500 duration-300 hover:text-white cursor-pointer border-gray-600">
            Location
          </li>
        </NavLink> */}

        <NavLink to="/login">
          <li className=" p-4 text-gray-700 border-b rounded-xl hover:bg-orange-500 duration-300 hover:text-white cursor-pointer border-gray-600">
          {
            token ? "Logout":"login"
           }
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
