import axios from "axios";

export const updateJobSeekerAccountDetails = async ({
  experience,
  education,
  skills,
  resume,
  id,
}) => {
  console.log(skills);
  if (resume == null) {
    throw new Error("Please upload resume");
  }
  const formData = new FormData();

  formData.append("experience", experience);
  formData.append("education", education);
  formData.append("skills", skills);
  formData.append("resume", resume);

  const { data } = await axios.patch(
    `/api/v1/job_seeker/update_job_seeker_details/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
