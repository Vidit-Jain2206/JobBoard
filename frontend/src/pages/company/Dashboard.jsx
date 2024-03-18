import { Avatar } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CompanyPopup } from "../../components/CompanyPopup";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const done = useRef(true);
  const [listings, setListings] = useState([]);
  const [popup, setPopup] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("Logged out");
  };

  return (
    <div className="w-full relative">
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
              <div className="absolute top-full right-0 mt-2 w-[12rem] bg-white border border-gray-200 rounded shadow-lg">
                <button
                  onClick={() => {
                    setPopup(!popup);
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                >
                  My Profile
                </button>
                <hr />
                <Link
                  to="/company/createlisting"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Create Job Listing
                </Link>
                <hr />
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
      {/* main section */}
      <div className="w-full bg-[#FAFAFA] h-[calc(100vh-5rem)] flex justify-center ">
        <div className="w-[90%] md:w-[85%] xl:w-[50%] h-[95%] flex flex-row flex-wrap md:flex-row gap-4 mt-[2rem] ">
          <div className="w-[95%] h-[100%] flex flex-col bg-white rounded-3xl shadow-xl p-4">
            <p className="text-right mb-[1rem] text-sm tracking-wide">
              Sort By
              <select
                className="ml-[0.5rem] border-2 border-[#275df5] text-[#275df5] font-medium tracking-wide"
                onChange={(e) => {
                  const sorted = [...listings].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return e.target.value === "2"
                      ? dateA - dateB
                      : dateB - dateA;
                  });
                  setListings(sorted);
                }}
              >
                <option value="select">select</option>
                <option value="1">Newest</option>
                <option value="2">Oldest</option>
              </select>
            </p>
            <div className=" h-[100%] w-full overflow-y-scroll">
              <h2 className="text-2xl lg:text-3xl font-bold">My Listings</h2>
              <ul className="mt-[1rem] flex flex-col items-center justify-center gap-4">
                {listings?.map((listing) => (
                  <></>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <CompanyPopup
          company={user}
          onClose={() => {
            setPopup(!popup);
          }}
        />
      )}
    </div>
  );
};
