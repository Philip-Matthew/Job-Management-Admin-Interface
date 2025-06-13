const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  company_name: { type: String, required: true },
  location: { type: String, required: true },
  job_type: { type: String, required: true },
  salary_min: { type: Number },
  salary_max: { type: Number },
  application_deadline: { type: Date, required: true },
  job_description: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
