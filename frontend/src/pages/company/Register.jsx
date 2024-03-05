import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    description: "",
    website: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const submitForm = () => {};

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
          <button className=" font-medium tracking-wide text-md">
            Already Registered?{" "}
            <span className="text-[#275df5] font-semibold hover:underline">
              <Link to="/company_login"> Login</Link>
            </span>{" "}
            here
          </button>
        </div>
      </div>

      <div className="bg-[#FAFAFA]  min-h-[40rem] h-auto flex items-center justify-center">
        <div className="w-[85%] md:w-[90%] xl:w-[60%] min-h-[30rem] h-[80%]">
          <div className=" w-full flex flex-wrap justify-between flex-row mt-[3rem] gap-4">
            <div className="w-[95%] md:w-[26%]">
              <div className="w-full flex flex-col justify-center items-center px-4 py-8 bg-white border-2 rounded-xl">
                <img
                  src="https://static.naukimg.com/s/7/104/assets/images/white-boy.a0d2814a.png"
                  alt=""
                  className="w-[60%] h-[9rem]"
                />
                <h2 className="text-center font-semibold mt-2 text-md">
                  On registering, you can
                </h2>
                <ul className="list-none">
                  <li className="flex items-center  mb-2 tracking-wide my-4 text-[14px] text-[#474d6a]">
                    <span className="mr-[0.1rem] text-base lg:mr-[0.24rem] text-green-500 tracking-wide">
                      <TiTick />
                    </span>
                    <p>
                      {" "}
                      Build your profile and let people find your job listings
                    </p>
                  </li>
                  <li className="flex items-center mb-2 tracking-wide my-4 text-[14px] text-[#474d6a]">
                    <span className="mr-[0.1rem] text-base lg:mr-[0.24rem] text-green-500 tracking-wide">
                      <TiTick />
                    </span>
                    <p> Get job applicants delivered right to your email</p>
                  </li>
                  <li className="flex items-center  mb-2 tracking-wide my-4 text-[14px] text-[#474d6a]">
                    <span className="mr-[0.1rem] text-base lg:mr-[0.24rem] text-green-500 tracking-wide">
                      <TiTick />
                    </span>
                    <p> Find an employee and grow your company</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[95%] md:w-[70%] flex flex-col p-4 md:px-12 md:py-8 bg-white rounded-xl shadow-md">
              <div className="flex flex-col justify-between ">
                <h2 className="text-xl font-bold">Create your profile</h2>
                <p className="text-[0.9rem] text-[#717b9e] ">
                  Search & find job seekers from India's No.1 Job Site
                </p>
              </div>

              <form
                action=""
                onSubmit={submitForm}
                className="flex flex-col justify-center items-center w-full mt-[2rem]"
              >
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    required
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          username: e.target.value,
                        };
                      });
                    }}
                    value={formData.username}
                  />
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="email"
                  >
                    Email ID
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    required
                    type="email"
                    placeholder="Enter Email ID"
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          email: e.target.value,
                        };
                      });
                    }}
                    value={formData.email}
                  />
                  {!isEmailValid ? (
                    <p className="text-red-500 mt-1 text-[0.75rem]">
                      Email Id is not valid
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Enter Password"
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          password: e.target.value,
                        };
                      });
                    }}
                    value={formData.password}
                  />
                  <p
                    className="text-[#4a90e2] text-[0.75rem] mt-1 text-right cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    Show password
                  </p>
                </div>

                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="company_name"
                  >
                    Company Name
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                    id="company_name"
                    type="text"
                    placeholder="Enter Company Name"
                    required
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          company_name: e.target.value,
                        };
                      });
                    }}
                    value={formData.company_name}
                  />
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="description"
                  >
                    About the Company
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                    id="description"
                    type="text"
                    placeholder="Enter Description"
                    required
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          description: e.target.value,
                        };
                      });
                    }}
                    value={formData.description}
                  />
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="website"
                  >
                    Website
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                    id="website"
                    type="text"
                    placeholder="Enter Website"
                    required
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          website: e.target.value,
                        };
                      });
                    }}
                    value={formData.website}
                  />
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="website"
                  >
                    Headquaters
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                    id="location"
                    type="text"
                    placeholder="Enter Location"
                    required
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          location: e.target.value,
                        };
                      });
                    }}
                    value={formData.location}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-[#4a90e2] text-white border-2 text-[0.75rem] lg:text-sm font-semibold border-[#4a90e2] py-2 px-4 w-full"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* main section */}
    </div>
  );
};
