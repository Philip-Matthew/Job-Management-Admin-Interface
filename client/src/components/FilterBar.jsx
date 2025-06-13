import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salaryRange: [50000, 80000], // per month
  });

  const triggerFilter = (updatedFilters) => {
    const filterPayload = {
      title: updatedFilters.title,
      location: updatedFilters.location,
      jobType: updatedFilters.jobType,
      minSalary: updatedFilters.salaryRange[0],
      maxSalary: updatedFilters.salaryRange[1],
    };

    console.log("Sending Filter Payload:", filterPayload);
    onFilter(filterPayload);
  };

  const handleChange = (name, value) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    triggerFilter(updated);
  };

  const handleFilterUpdate = (name, value) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    triggerFilter(updated);
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex items-center gap-6 w-full">
      {/* Job Title */}
      <div className="flex items-center gap-3 flex-grow border-r pr-6">
        <img src="/icons/search.png" className="h-4 w-4" alt="search" />
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Search By Job Title, Role"
          className="w-full text-sm placeholder-[#686868] font-medium text-gray-900 outline-none"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 flex-grow border-r pr-6">
        <img src="/icons/location.png" className="h-4 w-3.5" alt="location" />
        <input
          name="location"
          value={filters.location}
          placeholder="Preferred Location"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="w-full text-sm placeholder-[#686868] font-medium text-gray-900 outline-none"
        />
      </div>

      {/* Job Type */}
      <div className="flex items-center gap-3 flex-grow border-r pr-6">
        <img src="/icons/type.png" className="h-4 w-4" alt="type" />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="w-full text-sm text-[#686868] font-medium outline-none bg-transparent"
        >
          <option value="">Job type</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div className="flex flex-col justify-center flex-grow">
        <div className="flex justify-between text-xs text-[#222222] font-semibold mb-2">
          <label className="text-sm text-gray-700 font-medium">
            Salary Per Month
          </label>
          <div>
            <span>₹{(filters.salaryRange[0] / 1000).toFixed(0)}k</span>
            <span className="mx-1">-</span>
            <span>₹{(filters.salaryRange[1] / 1000).toFixed(0)}k</span>
          </div>
        </div>
        <Slider
          range
          min={50000}
          max={100000}
          step={1000}
          value={filters.salaryRange}
          onChange={(value) => setFilters({ ...filters, salaryRange: value })}
          onChangeComplete={(value) => handleFilterUpdate("salaryRange", value)}
          trackStyle={[{ backgroundColor: "black" }]}
          handleStyle={[
            { borderColor: "black", backgroundColor: "white" },
            { borderColor: "black", backgroundColor: "white" },
          ]}
        />
      </div>
    </div>
  );
};

export default FilterBar;
