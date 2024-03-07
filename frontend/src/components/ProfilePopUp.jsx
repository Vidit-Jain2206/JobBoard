/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";

import { BsEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { updateJobSeekerAccountDetails } from "../server/jobSeeker";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/user/userslice";

const ProfilePopUp = ({ user, children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resume, setResume] = useState(null);
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    education: user.jobSeeker.education,
    experience: user.jobSeeker.experience,
    skills: user.jobSeeker.skills,
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      setResume(null);
      alert("Please select a PDF file.");
    }
  };

  const updateChanges = async (e) => {
    e.preventDefault();
    const { experience, education, skills } = formData;
    try {
      const { data } = await updateJobSeekerAccountDetails({
        experience,
        education,
        skills,
        resume,
      });
      console.log(data);
      dispatch(signInUser(data.user));
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : <MdEdit />}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"25px"}
            display="flex"
            justifyContent={"start"}
          >
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent=""
            flexDir="column"
            alignItems=""
          >
            <Box
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work Sans"
              display={"flex"}
              flexDir={"column"}
            >
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
            </Box>
            <Box fontSize={{ base: "28px", md: "30px" }} fontFamily="Work Sans">
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
                  <option value="0-1 year">0-1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </Box>
            <Box fontSize={{ base: "28px", md: "30px" }} fontFamily="Work Sans">
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
                />
              </div>
            </Box>
            <Box fontSize={{ base: "28px", md: "30px" }} fontFamily="Work Sans">
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
                <div className="text-sm grid-cols-2 md:grid-cols-12 mt-[0.75rem]">
                  {formData?.skills?.map((skill) => (
                    <p className="inline text-gray-500 border-2 mt-[0.5rem] p-1">
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={updateChanges}>
              Save Changes
            </Button>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePopUp;
