import axios from "axios";
export const getAllJobListings = async () => {
  const { data } = await axios.get("/api/v1/job_listing");
  return data;
};

export const getJobDetailsbyId = async (id) => {
  const { data } = await axios.get(`/api/v1/job_listing/${id}`);
  return data;
};

export const createListing = async (formData) => {
  console.log(formData);
  const { data } = await axios.post("/api/v1/job_listing/create", formData);
  return data;
};
