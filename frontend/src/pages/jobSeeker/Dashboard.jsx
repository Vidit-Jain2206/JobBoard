import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import JobListing from "../../components/JobListing";
import { getAllJobListings } from "../../server/JobListings";
import Filters from "../../components/Filters";
import Navbar from "../../components/Navbar";
import { useToast } from "@chakra-ui/react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const done = useRef(true);
  const toast = useToast();
  const [listings, setListings] = useState([]);

  async function fetchAllJobListings(ignore) {
    try {
      const { data } = await getAllJobListings();
      if (!ignore) {
        setListings(data);
      }
      toast({
        title: "All listings fetched successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  useEffect(() => {
    let ignore = false;
    if (done.current) {
      fetchAllJobListings(ignore);
      done.current = false;
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="w-full">
      {/* navbar */}
      <Navbar user={user} />

      <div className="w-full bg-[#FAFAFA] h-[calc(100vh-5rem)] flex justify-center ">
        <div className="w-[90%] md:w-[85%] xl:w-[50%] h-[95%] flex flex-row flex-wrap md:flex-row gap-4 mt-[2rem] ">
          {/* filters */}
          <div className="w-[95%] md:w-[30%] h-[47rem]">
            <Filters
              originalListing={listings}
              listings={listings}
              setListings={setListings}
            />
          </div>
          {/* jobListings */}
          <div className="w-[95%] md:w-[68%] h-[100%] flex flex-col">
            <p className="text-right mb-[1rem] text-sm tracking-wide">
              Sort By
              <select
                className="ml-[0.5rem] border-2 border-[#275df5] text-[#275df5] font-medium tracking-wide"
                onChange={(e) => {
                  const sorted = [...listings].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return e.target.value === "2"
                      ? dateA - dateB
                      : dateB - dateA;
                  });
                  setListings(sorted);
                }}
              >
                <option value="select">select</option>
                <option value="1">Newest</option>
                <option value="2">Oldest</option>
              </select>
            </p>
            <div className=" h-[100%] w-full overflow-y-scroll">
              <ul className="mt-[1rem] flex flex-col items-center justify-center gap-4">
                {listings?.map((listing) => (
                  <JobListing listing={listing} key={listing.id} flag={true} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
