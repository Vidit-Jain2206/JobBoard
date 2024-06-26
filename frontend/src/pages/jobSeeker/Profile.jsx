import { Avatar, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import ProfilePopUp from "../../components/ProfilePopUp";
import JobListing from "../../components/JobListing";
import { getAllMyJobApplications } from "../../server/jobApplication";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const done = useRef(true);
  const { user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const toast = useToast();

  const fetchAllJobApplications = async (ignore) => {
    try {
      const { data } = await getAllMyJobApplications();
      if (!ignore) {
        setApplications(data);
      }
      toast({
        title: "All Applications fetched successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  useEffect(() => {
    let ignore = false;
    if (done.current) {
      fetchAllJobApplications(ignore);
      done.current = false;
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* navbar */}
      <Navbar user={user} />

      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#FAFAFA] flex justify-center">
        <div className="w-[95%] md:w-[90%] xl:w-[60%] min-h-[30rem] flex flex-col gap-4 mt-[2rem]">
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
                <ul className="w-[80%] mt-1 text-[13px] text-[#474d6a] font-normal italics flex flex-row overflow-x-scroll gap-2">
                  {user.jobSeeker.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div className="max-w-[10rem] w-[10rem] h-[10rem] flex justify-center items-center">
                  <Link
                    target="_blank"
                    to={user.jobSeeker.resume}
                    className="w-full h-full"
                  >
                    <span className="border-2 border-black px-3 py-1">
                      View Resume
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full overflow-y-scroll p-4 bg-white border-2 rounded-3xl shadow-xl flex flex-col">
            <h2 className="text-xl font-semibold tracking-wide">
              My Applications
            </h2>
            <ul className="mt-[1rem] flex flex-col gap-2">
              {applications.map((application, index) => (
                <JobListing
                  key={index}
                  listing={application.jobListing}
                  flag={true}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
