import axios from "axios";
export const getAllJobListings = async () => {
  const { data } = await axios.get("/api/v1/job_listing");
  return data;
};
