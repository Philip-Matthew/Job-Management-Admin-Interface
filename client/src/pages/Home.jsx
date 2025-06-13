import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import { getJobs } from "../api/api.js";
import JobForm from "../components/JobForm.jsx";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [isJobFormVisible, setJobFormVisible] = useState(false);

  const toggleJobForm = () => {
    setJobFormVisible((prev) => !prev);
  };

  const closeJobForm = () => {
    setJobFormVisible(false);
  };

  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "text-[#6B7280]" : "text-black font-medium";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="relative w-full bg-[#FFFFFF] ">
      {/* NavBar */}
      <div className="py-4 font-weight-600 text-md">
        <nav className="w-[65%] mx-auto drop-shadow-lg border-[#E5E7EB] bg-[#FFFFFF]  py-3 rounded-full flex items-center justify-evenly">
          {/* Logo */}
          <Link to="/" className="">
            <img src="/icons/company-logo.png" alt="Logo" className="h-8 w-8" />
          </Link>

          {/* Navigation */}
          <Link
            to="/"
            className={`${isActive(
              "/"
            )} hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 rounded-md bg-white px-4 py-2`}
          >
            Home
          </Link>
          <h2
            className={`hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105  rounded-md bg-white px-4 py-2  ${isActive(
              "/"
            )} cursor-pointer`}
          >
            Find Jobs
          </h2>
          <h2
            className={`hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105  rounded-md bg-white px-4 py-2 ${isActive(
              "/find-talents"
            )} cursor-pointer`}
          >
            Find Talents
          </h2>
          <h2
            className={`hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105  rounded-md bg-white px-4 py-2 ${isActive(
              "/about"
            )} cursor-pointer`}
          >
            About Us
          </h2>
          <h2
            className={`hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105  rounded-md bg-white px-4 py-2 ${isActive(
              "/testimonials"
            )} cursor-pointer`}
          >
            Testimonials
          </h2>

          {/* Create Job CTA */}
          <div className="flex justify-end">
            <button
              onClick={toggleJobForm}
              className="px-5 py-2.5 text-nowrap bg-gradient-to-t from-[#6100AD] to-[#A128FF] text-white hover:scale-105 text-md rounded-full font-medium hover:brightness-130 cursor-pointer transition duration-200"
            >
              Create Jobs
            </button>
          </div>
        </nav>
      </div>

      {/* Filter Bar */}
      <FilterBar onFilter={fetchJobs} />

      {/* Job List - Responsive Grid */}

      <div className="w-full  bg-white mx-0 shadow-md">
        <div className="mt-8 mx-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 rounded-lg ">
          {loading ? (
            <p className="text-gray-600">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>
      </div>

      {isJobFormVisible && (
        <div
          className="fixed inset-0 bg-[#A9A9A940] bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeJobForm} // Close modal on outside click
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <JobForm
              closeJobForm={closeJobForm}
              onSuccess={() => {
                closeJobForm();
                fetchJobs();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
