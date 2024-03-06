import React, { useState } from "react";
const location = [
  "delhi",
  "gurugram",
  "mumbai",
  "banglore",
  "kolkata",
  "noida",
];
const salary = [
  "0-3 Lakhs",
  "3-6 Lakhs",
  "6-10 Lakhs",
  "10-15 Lakhs",
  "15-25 Lakhs",
  "15+ lakhs",
];
const experience = [
  "0-1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];
const Filters = ({ originalListing, listings, setListings }) => {
  const [orgListing, setOrgListing] = useState(originalListing);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const handleLocationCheckboxToggle = (item) => {
    const isSelected = selectedLocation.includes(item);
    setSelectedLocation((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };
  const handleSalaryCheckboxToggle = (item) => {
    const isSelected = selectedSalary.includes(item);
    setSelectedSalary((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };
  const handleExperienceCheckboxToggle = (item) => {
    const isSelected = selectedExperience.includes(item);
    setSelectedExperience((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };
  const applyFilters = (e) => {
    e.preventDefault();
    console.log(orgListing);
    const filteredItems = orgListing.filter((listing) => {
      return (
        selectedLocation.length === 0 ||
        selectedLocation.includes(listing.location.toLowerCase())
      );
    });
    const filteredItems2 = filteredItems.filter((listing) => {
      return (
        selectedExperience.length === 0 ||
        selectedExperience.includes(listing.experience.toLowerCase())
      );
    });
    const filteredItems3 = filteredItems2.filter((listing) => {
      return (
        selectedSalary.length === 0 ||
        selectedSalary.includes(mapSalarytoString(listing.salary))
      );
    });
    setListings(filteredItems3);
  };

  const mapSalarytoString = (s) => {
    if (s <= 300000) {
      return salary[0];
    } else if (s <= 600000) {
      return salary[1];
    } else if (s <= 1000000) {
      return salary[2];
    } else if (s <= 1500000) {
      return salary[3];
    } else if (s <= 2500000) {
      return salary[4];
    }
    return salary[5];
  };

  return (
    <div className="w-full h-full p-4 bg-white border border-gray-200 rounded-2xl">
      <div className="w-[95%] mx-auto mt-[0.5rem]">
        <h2 className="font-bold  tracking-wide text-md border-b-2 border-gray-200 py-3">
          All Filters
        </h2>

        <div className="flex flex-col mt-[1rem]">
          <FilterSections
            heading={"Location"}
            itemsArray={location}
            state={selectedLocation}
            handlerFunction={handleLocationCheckboxToggle}
          />

          <FilterSections
            heading={"Salary"}
            itemsArray={salary}
            state={selectedSalary}
            handlerFunction={handleSalaryCheckboxToggle}
          />
          <FilterSections
            heading={"Experience"}
            itemsArray={experience}
            state={selectedExperience}
            handlerFunction={handleExperienceCheckboxToggle}
          />
        </div>
        <button
          className="mt-[0.5rem] w-[6rem] px-3 py-2 text-[14px] font-semibold tracking-wide border-1 border-[#275df5] text-white bg-[#275df5]"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

function FilterSections({ heading, itemsArray, state, handlerFunction }) {
  return (
    <div className="border-b-2 border-gray-200">
      <h2 className="font-bold text-md py-3 tracking-wide">{heading}</h2>
      <ul className="pb-4 flex flex-col gap-1 capitalize">
        {itemsArray.map((item) => (
          <li key={item}>
            <label className="text-[#474d6a] text-sm font-medium  tracking-wide flex flex-row items-center ">
              <input
                type="checkbox"
                checked={state.includes(item)}
                onChange={() => handlerFunction(item)}
                className="text-black mr-[1rem]"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
