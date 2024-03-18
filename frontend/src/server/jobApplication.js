import axios from "axios";

export const getAllMyJobApplications = async () => {
  const { data } = await axios.get("/api/v1/job_application/my_applications");
  return data;
};

export const createJobApplication = async (id) => {
  try {
    const { data } = await axios.post(`/api/v1/job_application/create/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
