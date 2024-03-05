import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Register = () => {
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    education: "",
    experience: "",
    skills: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [skill, setSkill] = useState("");
  const submitForm = (event) => {
    event.preventDefault();
    if (resume) {
      // You can perform further actions with the selected PDF file here
      console.log("Selected PDF file:", resume);
    } else {
      alert("Please select a PDF file.");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if the selected file is a PDF
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      // Clear the selected file if it's not a PDF
      setResume(null);
      alert("Please select a PDF file.");
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
          <button className=" font-medium tracking-wide text-md">
            Already Registered?{" "}
            <span className="text-[#275df5] font-semibold hover:underline">
              <Link to="/jobseeker_login"> Login</Link>
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
                    <p> Build your profile and let recruiters find you</p>
                  </li>
                  <li className="flex items-center mb-2 tracking-wide my-4 text-[14px] text-[#474d6a]">
                    <span className="mr-[0.1rem] text-base lg:mr-[0.24rem] text-green-500 tracking-wide">
                      <TiTick />
                    </span>
                    <p> Get job postings delivered right to your email</p>
                  </li>
                  <li className="flex items-center  mb-2 tracking-wide my-4 text-[14px] text-[#474d6a]">
                    <span className="mr-[0.1rem] text-base lg:mr-[0.24rem] text-green-500 tracking-wide">
                      <TiTick />
                    </span>
                    <p> Find a job and grow your career</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[95%] md:w-[70%] flex flex-col p-4 md:px-12 md:py-8 bg-white rounded-xl shadow-md">
              <div className="flex flex-col justify-between ">
                <h2 className="text-xl font-bold">Create your profile</h2>
                <p className="text-[0.9rem] text-[#717b9e] ">
                  Search & apply to jobs from India's No.1 Job Site
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
                    className="block text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="education"
                  >
                    Highest Education
                  </label>
                  <select
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                    id="education"
                    placeholder="Enter Highest Education"
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          education: e.target.value,
                        };
                      });
                    }}
                    value={formData.education}
                  >
                    <option value="">Select</option>
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="experience"
                  >
                    Experience
                  </label>
                  <select
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                    id="experience"
                    placeholder="Enter Experience"
                    onChange={(e) => {
                      setFormData((prevstate) => {
                        return {
                          ...prevstate,
                          experience: e.target.value,
                        };
                      });
                    }}
                    value={formData.experience}
                  >
                    <option value="">Select</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block  text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="resume"
                  >
                    Resume
                  </label>
                  <input
                    className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                    id="experience"
                    placeholder="Enter Resume"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  ></input>
                </div>
                <div className="mb-8 w-full">
                  <label
                    className="block text-sm mb-1 font-semibold tracking-wide"
                    htmlFor="skills"
                  >
                    Skills
                  </label>
                  <div className="relative rounded-2xl">
                    <input
                      className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                      id="skill"
                      type="text"
                      placeholder="Enter Skills"
                      value={skill}
                      onChange={(e) => {
                        setSkill(e.target.value);
                      }}
                    />
                    <FaArrowRightLong
                      className=" bg-white text-gray-400 border border-gray-400 absolute right-0 top-0  w-[2rem] md:w-[3rem] p-[0.25rem] md:p-[0.625rem] h-full  rounded-r-2xl"
                      onClick={(e) => {
                        setFormData((prevstate) => {
                          return {
                            ...prevstate,
                            skills: [...prevstate.skills, skill],
                          };
                        });
                        setSkill("");
                      }}
                    />
                  </div>
                  <div className="grid-cols-2 md:grid-cols-12 mt-[0.75rem]">
                    {formData?.skills?.map((skill) => (
                      <p className="inline text-gray-500 border-2 mt-[0.5rem] px-3 py-2">
                        {skill}
                      </p>
                    ))}
                  </div>
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

export default Register;
