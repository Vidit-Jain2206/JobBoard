import axios from "axios";

export const updateCompanyDetails = async ({ formData, id }) => {
  try {
    const { data } = await axios.patch(
      `/api/v1/company/update_company_details/${id}`,
      formData
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
