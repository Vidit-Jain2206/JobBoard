import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setIsEmailValid(false);
      return;
    }
    if (!password) {
      toast.error({
        message: "Please enter a password",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      console.log(data);
      // after successful login
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error({
        message: error.response.data.message,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
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
          <button className="">
            <Link to="/jobSeeker_login">For JobSeekers</Link>
          </button>
        </div>
      </div>

      <div className="bg-[#FAFAFA]  min-h-[40rem] h-auto flex items-center justify-center">
        <div className="w-[85%] md:w-[80%] xl:w-[50%] min-h-[30rem] h-[80%] flex flex-wrap flex-col-reverse xl:flex-row gap-0">
          <div className="w-[95%] lg:w-[55%] h-full rounded py-4 mx-auto ">
            <div className="rounded mx-auto w-full lg:p-12 h-full shadow-[0_9px_16px_0_rgba(0,106,194,0.2)]  bg-white ">
              <div className="font-bold text-xl mb-4">
                From Campus to Senior Level Hiring
              </div>
              <ul className="list-none mt-[1.5rem]">
                <li className="flex items-center mb-2 tracking-wide my-[1rem] text-[0.75rem] lg:text-sm">
                  <span className="mr-[0.1rem] text-sm lg:mr-[0.24rem] lg:text-md text-[#4a90e2] tracking-wide">
                    <TiTick />
                  </span>
                  Streamlined Hiring Process
                </li>
                <li className="flex items-center mb-2 tracking-wide my-[1rem] text-[0.75rem] lg:text-sm">
                  <span className="mr-[0.1rem] text-sm lg:mr-[0.24rem] lg:text-md text-[#4a90e2] tracking-wide">
                    <TiTick />
                  </span>
                  Customized Job Listings
                </li>
                <li className="flex items-center mb-2 tracking-wide my-[1rem] text-[0.75rem] lg:text-sm">
                  <span className="mr-[0.1rem] text-sm lg:mr-[0.24rem] lg:text-md text-[#4a90e2] tracking-wide">
                    <TiTick />
                  </span>
                  Enhanced Security Features
                </li>
                <li className="flex items-center mb-2 tracking-wide my-[1rem] text-[0.75rem] lg:text-sm">
                  <span className="mr-[0.1rem] text-sm lg:mr-[0.24rem] lg:text-md text-[#4a90e2] tracking-wide">
                    <TiTick />
                  </span>
                  Advanced Search Filters
                </li>
              </ul>
              <Link to="/company_register">
                <button className="text-[#4a90e2] border-2 text-[0.75rem] lg:text-sm font-semibold border-[#4a90e2] py-2 px-4 rounded mt-4 w-[90%] max-w-[15rem]">
                  Register for Free
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[95%] lg:w-[45%] h-[23rem]">
            <div className="rounded mx-auto w-full lg:px-12 py-8 h-full shadow-[0_9px_16px_0_rgba(0,106,194,0.2)] bg-white ">
              <div className="font-bold text-xl mb-4">Login</div>
              <form
                action=""
                onSubmit={submitForm}
                className="flex flex-col justify-center items-center w-full"
              >
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm mb-1 font-semibold"
                    htmlFor="email"
                  >
                    Email ID
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded w-full py-[0.85rem] px-3 text-[0.85rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
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
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm mb-1 font-semibold"
                    htmlFor="email"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded w-full py-[0.85rem] px-3 text-[0.85rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <button
                  type="submit"
                  className="mt-2 bg-[#4a90e2] text-white border-2 text-[0.75rem] lg:text-sm font-semibold border-[#4a90e2] py-2 px-4 w-full"
                >
                  Login
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
