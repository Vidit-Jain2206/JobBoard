import axios from "axios";

export const getAllMyJobApplications = async () => {
  const { data } = await axios.get("/api/v1/job_application/my_applications");
  return data;
};
