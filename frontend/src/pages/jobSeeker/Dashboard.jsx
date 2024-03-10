import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePopUp from "../../components/ProfilePopUp";
import JobListing from "../../components/JobListing";
import { getAllJobListings } from "../../server/JobListings";
import Filters from "../../components/Filters";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const done = useRef(true);
  const [listings, setListings] = useState([]);

  async function fetchAllJobListings(ignore) {
    const { data } = await getAllJobListings();
    console.log(data);
    if (!ignore) {
      setListings(data);
    }
  }
  useEffect(() => {
    let ignore = false;
    if (done.current) {
      fetchAllJobListings(ignore);
      done.current = false;
    }

    return () => {
      ignore = true;
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Your logout logic here
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
        <div className="w-[90%] md:w-[85%] xl:w-[50%] min-h-[30rem] h-svh flex flex-wrap md:flex-row gap-4 mt-[2rem]">
          {/* filters */}
          <div className="w-[95%] md:w-[30%] h-[47rem]">
            <Filters
              originalListing={listings}
              listings={listings}
              setListings={setListings}
            />
          </div>
          {/* jobListings */}
          <div className="w-[95%] md:w-[68%]  flex-col h-auto">
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
            <div className="mt-[1rem] flex-col flex items-center justify-center gap-2">
              {listings?.map((listing) => (
                <JobListing listing={listing} key={listing.id} flag={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* main section */}
    </div>
  );
};

export default Dashboard;
