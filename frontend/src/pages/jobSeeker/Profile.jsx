import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import ProfilePopUp from "../../components/ProfilePopUp";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="w-full">
      {/* navbar */}
      <div className="w-full h-[4.5rem] ">
        <div className="p-4 w-[95%] md:w-[90%] xl:w-[60%] h-full  flex flex-row justify-between items-center mx-auto">
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

      <div className="w-full bg-[#FAFAFA] min-h-[40rem] h-auto flex justify-center">
        <div className="w-[95%] md:w-[90%] xl:w-[60%] min-h-[30rem] flex flex-wrap md:flex-col gap-4 mt-[2rem]">
          {/* upper part */}
          <div className="w-full p-4 bg-white border-2 rounded-3xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 min-h-[10rem]">
              <div className="w-full h-full flex justify-center items-center">
                <div className="max-w-[10rem] w-[10rem] h-[10rem] flex justify-center items-center">
                  <Avatar
                    name={user.username}
                    size="2xl"
                    cursor="pointer"
                    className="w-full h-full"
                  ></Avatar>
                </div>
              </div>
              <div className=" md:col-span-2 lg:col-span-3 py-4 flex flex-col items-start justify-center">
                <h2 className="text-[24px] text-[#121224] traking-wide font-bold flex flex-row justify-between gap-2 items-center">
                  <span>{user.username}</span>
                  <ProfilePopUp user={user}>
                    <MdEdit className="w-[1rem] h-[1rem] text-[#474d6a]" />
                  </ProfilePopUp>
                </h2>
                <h3 className="text-[16px] text-[#474d6a] traking-wide font-bold mt-[2px]">
                  {user.email}
                </h3>
                <h4 className="text-[14px] text-[#474d6a] traking-wide font-medium mt-[-1px]">
                  {user.jobSeeker.education}
                </h4>
                <h4 className="text-[14px] text-[#474d6a] traking-wide font-medium mt-[-1px]">
                  {user.jobSeeker.experience}
                </h4>
                <ul className="w-[80%] mt-1 text-[13px] text-[#474d6a] font-normal italics flex flex-row overflow-x-scroll">
                  {user.jobSeeker.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div className="max-w-[10rem] w-[10rem] h-[10rem] flex justify-center items-center">
                  <img
                    src={user.jobSeeker.resume}
                    alt=""
                    className="w-full h-full"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 bg-white border-2 rounded-3xl shadow-xl "></div>
        </div>
      </div>
      {/* main section */}
    </div>
  );
};

export default Profile;
