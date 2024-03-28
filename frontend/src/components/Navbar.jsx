import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };
  return (
    <div className="w-full h-[4.5rem] ">
      <div className="p-4 w-[95%] md:w-[90%] xl:w-[60%] h-full flex flex-row justify-between items-center mx-auto">
        {/* logo */}
        <div className="w-[10rem] h-[2rem]">
          <img src="" alt="" className="w-full h-full" />
        </div>
        {/* redirect page */}
        <div className="relative">
          <button
            className="text-white focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <Avatar name={user.username} size="sm" cursor="pointer"></Avatar>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-[10rem] bg-white border border-gray-200 rounded shadow-lg">
              <Link
                to="/jobseeker/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => console.log("clicked")}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
