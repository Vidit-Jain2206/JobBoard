import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompanyDetails } from "../server/company";
import { signInUser } from "../redux/user/userslice";

export function CompanyPopup({ company, onClose }) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    company_name: company.company.company_name,
    description: company.company.description,
    website: company.company.website,
    location: company.company.location,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        const { data } = await updateCompanyDetails({
          formData,
          id: company.company.id,
        });
        setEdit(!edit);
        dispatch(signInUser(data));
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      setEdit(!edit);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[40%]">
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="company_name" className="block font-semibold">
              Company Name:
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={!edit}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={!edit}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block font-semibold">
              Website:
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={!edit}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block font-semibold">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={!edit}
            />
          </div>

          <div className="relative flex flex-row gap-2">
            <button
              type="submit"
              className="bg-blue-500 border-2 border-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              {edit ? "Save Changes" : "Edit Profile"}
            </button>
            <button
              className="bg-blue-500 border-2 border-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
