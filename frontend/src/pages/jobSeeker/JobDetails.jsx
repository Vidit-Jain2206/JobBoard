import { Avatar } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoBagOutline, IoLocationOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getJobDetailsbyId } from "../../server/JobListings";
import { createJobApplication } from "../../server/jobApplication";

const JobDetails = () => {
  const done = useRef(true);
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [details, setDetails] = useState({});
  const { id } = useParams();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleJobApplication = async () => {
    try {
      const { data } = await createJobApplication(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobDetails = useCallback(
    async (ignore) => {
      const { data } = await getJobDetailsbyId(id);
      if (!ignore) {
        setDetails(data);
      }
    },
    [id]
  );

  useEffect(() => {
    let ignore = false;
    if (done.current) {
      fetchJobDetails(ignore);
      done.current = false;
    }
    return () => {
      ignore = true;
    };
  }, [fetchJobDetails, id]);

  return (
    <div className="w-screen h-screen flex flex-col">
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
      <div className="w-full min-h-[calc(100%-4.5rem)] bg-[#FAFAFA] flex justify-center">
        <div className="mt-[4rem] w-[95%] md:w-[90%] xl:w-[60%] h-full grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* job detail */}
          <div className=" lg:col-span-3 h-full flex flex-col">
            <div
              className={`bg-white w-full h-auto py-4 flex justify-center items-center  shadow-[0_6px_12px_rgba(30,10,58,.04)] rounded-3xl cursor-pointer hover:shadow-[0_15px_25px_rgba(30,10,58,.06)] transition duration-200`}
            >
              <div className="w-[94%] h-[95%] flex flex-col justify-center">
                <div className="mb-[1rem]">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
                    {details?.title}
                  </h2>
                  <h3 className="text-sm  md:text-lg lg:text-xl font-semibold text-[#474d6a] flex items-center">
                    {details?.company?.company_name}
                    <span className="ml-[0.5rem] text-[13px] text-blue-400 underline font-semibold italics">
                      <Link to={`${details?.company?.website}`}>Link</Link>
                    </span>
                  </h3>
                </div>

                <div className="mb-[1rem]">
                  <div className="font-medium grid grid-cols-5 lg:grid-cols-4 gap-3 text-[#474d6a]">
                    <div className="flex flex-row border-r-1 border-r-[#474d6a] items-center justify-start text-[14px] lg:text-[16px]">
                      <IoBagOutline className="mr-[0.35rem]" />
                      {details?.experience}
                    </div>
                    <div className="flex flex-row border-r-1 border-[#474d6a] items-center justify-start text-[14px] lg:text-[16px]">
                      <LiaRupeeSignSolid className="mr-[0.35rem] " />
                      {details?.salary}
                    </div>
                    <div className="flex flex-row border-r-1 border-[#474d6a] items-center justify-start text-[14px] lg:text-[16px]">
                      <IoLocationOutline className="mr-[0.35rem] " />
                      {details?.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-[1rem] bg-white w-full flex flex-col justify-between py-4 shadow-[0_6px_12px_rgba(30,10,58,.04)] rounded-3xl cursor-pointer hover:shadow-[0_15px_25px_rgba(30,10,58,.06)] transition duration-200`}
            >
              {/* job description */}
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold text-black text-left">
                  Job Description
                </h3>
                <p className="w-[95%] md:w-[90%] text-[0.825rem] md:text-[1rem] mt-[0.5rem] text-[#474d6a] tracking-wide">
                  {details?.description}
                </p>
              </div>
              {/* skills */}
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold text-black text-left">
                  Skills
                </h3>
                <ul className="flex flex-row flex-wrap gap-2 mt-[0.5rem]">
                  {details &&
                    details.skills_required &&
                    details?.skills_required.length > 0 &&
                    details.skills_required.map((skill) => (
                      <li
                        className="rounded-lg px-2 py-1 text-[#474d6a] tracking-wide border-2 border-[#474d6a] bg-white"
                        key={skill}
                      >
                        {skill}
                      </li>
                    ))}
                </ul>
              </div>
              {/* company description */}
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold text-black text-left">
                  About the Company
                </h3>
                <p className="w-[95%] md:w-[90%] text-[0.825rem] md:text-[1rem] mt-[0.5rem] text-[#474d6a] tracking-wide">
                  {details?.company?.description}
                </p>
              </div>

              {/* apply button */}
              <div className="px-4 py-2">
                <button
                  onClick={handleJobApplication}
                  className="w-[10rem] px-5 py-2 rounded-lg border-2 border-[#4a90e2] bg-[#4a90e2] text-white hover:text-[#4a90e2] hover:bg-white "
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* mores job */}
          <div className=" lg:col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
