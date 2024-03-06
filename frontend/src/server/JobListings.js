import axios from "axios";
export const getAllJobListings = async () => {
  const listings = await axios.get("/api/v1/jobseeker/joblisting");
  return listings;
};
