const express = require("express");
const router = express.Router();
const Job = require("../models/Job"); // Import your Mongoose Job model

require("dotenv").config();

//  Build Jobs with optional filters
const buildJobFilter = (query) => {
  const filter = {};

  if (query.title) filter.job_title = { $regex: query.title, $options: "i" };

  if (query.location)
    filter.location = { $regex: query.location, $options: "i" };

  if (query.jobType) filter.job_type = query.jobType;

  if (query.minSalary) {
    filter.salary_max = {
      ...filter.salary_max,
      $gte: parseInt(query.minSalary),
    };
  }

  if (query.maxSalary) {
    filter.salary_min = {
      ...filter.salary_min,
      $lte: parseInt(query.maxSalary),
    };
  }
  return filter;
};

// GET: All Jobs with optional filters
router.get("/", async (req, res) => {
  const filter = buildJobFilter(req.query);
  try {
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
});

// POST: Create a new Job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ error: "Failed to insert job" });
  }
});

module.exports = router;
