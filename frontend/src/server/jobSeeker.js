import axios from "axios";

export const updateJobSeekerAccountDetails = async ({
  experience,
  education,
  skills,
  resume,
}) => {
  if (resume == null) {
    return;
  }
  const formData = new FormData();

  formData.append("experience", experience);
  formData.append("education", education);
  formData.append("skills", skills);
  formData.append("resume", resume);

  const { data } = await axios.post(
    "/api/v1/job_seeker/update_job_seeker_details",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
