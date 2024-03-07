import axios from "axios";

export const loginJobSeeker = async ({ email, password }) => {
  const { data } = await axios.post("/api/v1/job_seeker/login", {
    email: email,
    password: password,
  });

  return data;
};

export const registerJobSeeker = async ({
  username,
  email,
  password,
  experience,
  education,
  skills,
  resume,
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("experience", experience);
  formData.append("education", education);
  formData.append("skills", skills);
  formData.append("resume", resume);

  const { data } = await axios.post("/api/v1/job_seeker/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const loginCompany = async ({ email, password }) => {
  const { data } = await axios.post("/api/v1/company/login", {
    email: email,
    password: password,
  });

  return data;
};

export const registerCompany = async ({
  username,
  email,
  password,
  company_name,
  description,
  website,
  location,
}) => {
  const { data } = await axios.post("/api/v1/company/register", {
    username,
    email,
    password,
    company_name,
    description,
    website,
    location,
  });
  return data;
};
