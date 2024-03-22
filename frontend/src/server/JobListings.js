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
  const { data } = await axios.post("/api/v1/job_listing/create", formData);
  return data;
};

export const getAllMyListings = async () => {
  try {
    const { data } = await axios.get("/api/v1/job_listing/my_listings");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateListing = async (formData, id) => {
  const { data } = await axios.patch(
    `/api/v1/job_listing/update/${id}`,
    formData
  );
  return data;
};
export const deleteJobListing = async (id) => {
  const { data } = await axios.delete(`/api/v1/job_listing/delete/${id}`);
  return data;
};
