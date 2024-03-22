import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteJobListing } from "../server/JobListings";
function JobListing({ listing, flag, fetchAgain, setFetchAgain }) {
  console.log(listing);
  const givenDate = new Date(listing.createdAt);
  const differenceInMs = new Date() - givenDate;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor(differenceInMs / millisecondsInDay);
  const yearsAgo = Math.floor(daysAgo / 365);
  const monthsAgo = Math.floor(daysAgo / 30);

  const handleDeleteListing = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete")) {
      const { data } = await deleteJobListing(listing.id);
      console.log(data);
      alert("successfully deleted");
      setFetchAgain(!fetchAgain);
    }
  };
  return (
    <Link
      to={`${flag ? `/jobseeker/jobdetails/${listing.id}` : ""}`}
      className="cursor-pointer w-full"
    >
      <li
        className={`${
          flag ? "bg-white" : "bg-[#FAFAFA] border-2"
        } relative w-full h-auto py-4 flex justify-center items-center shadow-[0_6px_12px_rgba(30,10,58,.04)] rounded-3xl cursor-pointer hover:shadow-[0_15px_25px_rgba(30,10,58,.06)] transition duration-200`}
      >
        {flag === undefined && (
          <div className="absolute top-[10%] right-[2%] w-[3rem] h-[3rem] flex flex-row gap-2">
            <Link to={`/company/editListing/${listing.id}`}>
              <MdEdit />
            </Link>
            <MdDelete onClick={handleDeleteListing} className="text-red-400" />
          </div>
        )}
        <div className="w-[94%] h-[95%] flex flex-col justify-center">
          <div className="mb-[1rem]">
            <h2 className="text-lg font-semibold text-black">
              {listing.title}
            </h2>
            <h3 className="text-sm font-semibold text-[#474d6a]">
              {flag !== undefined && listing.company.company_name}
            </h3>
          </div>

          <div className="">
            <div className=" font-medium grid grid-cols-5 lg:grid-cols-7 gap-3 text-[#474d6a]">
              <div className="flex flex-row border-r-1 border-r-[#474d6a] items-center justify-start text-[14px]">
                <IoBagOutline className="mr-[0.35rem]" />
                {listing.experience}
              </div>
              <div className="flex flex-row border-r-1 border-[#474d6a] items-center justify-start text-[14px]">
                <LiaRupeeSignSolid className="mr-[0.35rem] " />
                {listing.salary}
              </div>
              <div className="flex flex-row border-r-1 border-[#474d6a] items-center justify-start text-[14px]">
                <IoLocationOutline className="mr-[0.35rem] " />
                {listing.location}
              </div>
            </div>
            <div className=" font-medium mt-1 text-[#474d6a] text-[14px] flex flex-row border-r-1 border-r-[#474d6a] items-center justify-start">
              <HiOutlineDocumentText className="mr-[0.35rem] text-md" />
              <p className="truncate">{listing.description}</p>
            </div>
            <div className="mt-2 text-sm text-[#717b9e]">
              <ul className="flex flex-row gap-4  list-disc overflow-x-auto ">
                {listing.skills_required.map((skill) => (
                  <li className="font-normal text-[0.825rem] flex flex-row items-center justify-between">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {(flag === undefined || flag) && (
            <div>
              {yearsAgo > 0 ? (
                yearsAgo > 1 ? (
                  <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                    {yearsAgo}+ Years Ago
                  </p>
                ) : (
                  <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                    {yearsAgo}+ Year Ago
                  </p>
                )
              ) : daysAgo > 30 ? (
                monthsAgo !== 1 ? (
                  <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                    {monthsAgo}+ Months Ago
                  </p>
                ) : (
                  <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                    {monthsAgo}+ Month Ago
                  </p>
                )
              ) : daysAgo !== 1 ? (
                <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                  {daysAgo}+ Days Ago
                </p>
              ) : (
                <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                  {daysAgo}+ Day Ago
                </p>
              )}

              <p className="mt-[0.75rem] text-[13px] font-normal leading-4 text-[#717b9e]">
                Applicants: {listing.applicationCount}
              </p>
            </div>
          )}
        </div>
      </li>
    </Link>
  );
}

export default JobListing;
