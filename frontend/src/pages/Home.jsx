import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <button className="border-2 px-5 py-2">
        <Link to="/jobseeker/login">Login as job Seeker</Link>
      </button>
      <button className="border-2 px-5 py-2">
        <Link to="/company/login">Login as Employer</Link>
      </button>
    </div>
  );
};

export default Home;
