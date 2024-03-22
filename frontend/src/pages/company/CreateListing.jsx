import { Avatar } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CompanyPopup } from "../../components/CompanyPopup";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  createListing,
  getJobDetailsbyId,
  updateListing,
} from "../../server/JobListings";

function CreateListing({ isEditable }) {
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills_required: "",
    salary: "",
    experience: "",
    startDate: "",
    location: "",
  });
  const [skill, setSkill] = useState("");
  const { id } = useParams();
  console.log(isEditable);

  const fetchListingById = async () => {
    const { data } = await getJobDetailsbyId(id);
    console.log(data);
    setFormData({
      title: data.title,
      description: data.description,
      skills_required: data.skills_required,
      salary: data.salary,
      experience: data.experience,
      startDate: data.startDate,
      location: data.location,
    });
  };
  useEffect(() => {
    if (isEditable) {
      fetchListingById();
    }
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      formData.salary = Number(formData.salary);
      if (!isEditable) {
        const { data } = await createListing(formData);
        alert(data.message);
      } else {
        const { data } = await updateListing(formData, id);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full relative">
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
      <div className="w-full bg-[#FAFAFA] min-h-[calc(100vh-5rem)] flex justify-center ">
        <div className="w-[90%] md:w-[85%] xl:w-[50%]  flex flex-row flex-wrap md:flex-row gap-4 mt-[2rem] ">
          <div className="w-[95%] h-[100%] flex flex-col bg-white rounded-3xl shadow-xl p-4">
            <h2 className="text-xl lg:text-2xl font-bold">Create Listing</h2>
            <form
              action=""
              onSubmit={submitForm}
              className="flex flex-col justify-center items-center w-full mt-[2rem]"
            >
              {/* title */}
              <div className="mb-8 w-full">
                <label
                  className="block text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                  id="title"
                  type="text"
                  placeholder="Enter Title"
                  required
                  onChange={(e) => {
                    setFormData((prevstate) => {
                      return {
                        ...prevstate,
                        title: e.target.value,
                      };
                    });
                  }}
                  value={formData.title}
                />
              </div>
              {/* description */}
              <div className="mb-8 w-full">
                <label
                  className="block  text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="description"
                >
                  Job Description
                </label>
                <textarea
                  className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  required
                  placeholder="Enter description"
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
              {/* skill_Required */}
              <div className="mb-8 w-full">
                <label
                  className="block text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="skills"
                >
                  Required Skills
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
                          skills_required: [
                            ...prevstate.skills_required,
                            skill,
                          ],
                        };
                      });
                      setSkill("");
                    }}
                  />
                </div>
                <div className="grid-cols-2 md:grid-cols-12 mt-[0.75rem]">
                  <ul className="flex flex-row gap-2 flex-wrap">
                    {formData &&
                      formData.skills_required &&
                      formData?.skills_required?.map((skill, index) => (
                        <li
                          key={index}
                          className="inline text-gray-500 border-2 mt-[0.5rem] px-3 py-2"
                        >
                          {skill}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              {/* experience */}
              <div className="mb-8 w-full">
                <label
                  className="block  text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="experience"
                >
                  Minimun Number of Experience in Years
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
                  <option value="0-1 year">0-1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
              {/* salary */}
              <div className="mb-8 w-full">
                <label
                  className="block  text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                  id="salary"
                  placeholder="Enter salary"
                  onChange={(e) => {
                    setFormData((prevstate) => {
                      return {
                        ...prevstate,
                        salary: e.target.value,
                      };
                    });
                  }}
                  value={formData.salary}
                ></input>
              </div>
              {/* startDate */}
              <div className="mb-8 w-full">
                <label
                  className="block  text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline "
                  id="startDate"
                  type="datetime-local"
                  placeholder="Enter Start Date"
                  required
                  onChange={(e) => {
                    setFormData((prevstate) => {
                      return {
                        ...prevstate,
                        startDate: e.target.value + ":00Z",
                      };
                    });
                  }}
                  value={formData.startDate.slice(0, 16)}
                />
              </div>
              {/* location */}
              <div className="mb-8 w-full">
                <label
                  className="block  text-sm mb-1 font-semibold tracking-wide"
                  htmlFor="location"
                >
                  Location
                </label>
                <select
                  className="shadow appearance-none border-[1px] border-gray-400 rounded-2xl w-full py-[16px] px-3 text-[0.85rem]  leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  placeholder="Enter location"
                  onChange={(e) => {
                    setFormData((prevstate) => {
                      return {
                        ...prevstate,
                        location: e.target.value,
                      };
                    });
                  }}
                  value={formData.location}
                >
                  <option value="">Select</option>
                  <option value="delhi">Delhi</option>
                  <option value="gurugram">Gurugram</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="banglore">Banglore</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="noida">Noida</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 bg-[#4a90e2] text-white border-2 text-[0.75rem] lg:text-sm font-semibold border-[#4a90e2] py-2 px-4 w-full"
              >
                {isEditable ? "Save Changes" : "Create Listing"}
              </button>
            </form>
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
}

export default CreateListing;
