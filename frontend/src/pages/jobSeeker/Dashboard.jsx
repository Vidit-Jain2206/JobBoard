import {
  Avatar,
  Link,
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

const Dashboard = () => {
  const done = useRef(true);
  const [listings, setListings] = useState([
    {
      id: "1",
      company_name: "google",
      title: "Backend developer",
      description:
        "Backend developer Lorem fdvfdnv nfonvjf vnefjnvefv vfevnoenv vfenw",
      skills_required: [
        "Nodejs",
        "express",
        "react",
        "mongoDb",
        "Nodejs",
        "express",
        "react",
        "mongoDb",
      ],
      salary: 3000000,
      location: "Delhi",
      experience: "0-1 year",
      startDate: "2023-01-01T00:00:00",
      createdAt: "2024-02-06T00:00",
    },
    {
      id: "2",
      company_name: "google",
      title: "Backend developer",
      description:
        "Backend developer Lorem fdvfdnv nfonvjf vnefjnvefv vfevnoenv vfenw",
      skills_required: [
        "Nodejs",
        "express",
        "react",
        "mongoDb",
        "Nodejs",
        "express",
        "react",
        "mongoDb",
      ],
      salary: 3000000,
      location: "Delhi",
      experience: "0-1 year",
      startDate: "2023-01-01T00:00:00",
      createdAt: "2022-02-06T00:00",
    },
  ]);

  async function fetchAllJobListings(ignore) {
    const listings = await getAllJobListings();
    if (!ignore) {
      setListings(listings);
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
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {};

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
          <Menu>
            <MenuButton>
              <Avatar name={user.username} size="sm" cursor="pointer"></Avatar>
            </MenuButton>
            <MenuList>
              <ProfilePopUp user={user}>
                <MenuItem>
                  <Link to="/jobseeker/profile">My Profile</Link>
                </MenuItem>
              </ProfilePopUp>

              <MenuDivider></MenuDivider>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
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
              {listings.map((listing) => (
                <JobListing listing={listing} key={listing.id} />
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
