import React from "react";
import { useForm } from "react-hook-form";
import { createJob } from "../api/api.js"; // Make sure this path is correct
import { format } from "date-fns";

export default function JobForm({ closeJobForm, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const jobData = {
        ...data,
        salary_min: parseInt(data.salary_min),
        salary_max: parseInt(data.salary_max),
        application_deadline: format(
          new Date(data.application_deadline),
          "yyyy-MM-dd"
        ),
      };
      await createJob(jobData);
      alert("Job posted successfully!");
      reset();
      onSuccess?.();
    } catch (error) {
      alert("Failed to create job.", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl space-y-4 mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Create Job Opening</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            type="text"
            {...register("job_title", { required: true })}
            className="input-style"
            placeholder="Full Stack Developer"
          />
          {errors.job_title && (
            <p className="text-red-500 text-xs">Job Title is required</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            {...register("company_name", { required: true })}
            className="input-style"
            placeholder="Amazon, Microsoft"
          />
          {errors.company_name && (
            <p className="text-red-500 text-xs">Company Name is required</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input-style"
            placeholder="Choose Preferred Location"
          />
          {errors.location && (
            <p className="text-red-500 text-xs">Location is required</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium">Job Type</label>
          <select {...register("job_type")} className="input-style">
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium">Salary Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              {...register("salary_min", { required: true })}
              placeholder="₹0"
              className="input-style w-1/2"
            />
            <input
              type="number"
              {...register("salary_max", { required: true })}
              placeholder="₹12,00,000"
              className="input-style w-1/2"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("application_deadline", { required: true })}
            className="input-style"
          />
          {errors.application_deadline && (
            <p className="text-red-500 text-xs">Deadline is required</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Job Description</label>
        <textarea
          {...register("job_description")}
          className="input-style min-h-[100px]"
          placeholder="Please share a description to let the candidate know more about the job role"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={closeJobForm}
          className="border border-gray-400 px-4 py-2 rounded-md text-sm text-nowrap flex items-center gap-2 cursor-pointer"
        >
          Save Draft{" "}
          <span>
            <img src="/down.png" alt="" />
          </span>
        </button>
        <button
          type="submit"
          className="bg-[#00AAFF] text-white px-6 py-2 rounded-md font-medium cursor-pointer hover:bg-[#0088CC] transition duration-200 ease-in-out flex items-center gap-2"
        >
          Publish &raquo;
        </button>
      </div>
    </form>
  );
}
