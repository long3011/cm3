const Job = require("../models/jobModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllJobs = async (req, res) => {
  //res.send("getAllJobs");
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /jobs
const createJob = async (req, res) => {
  //res.send("createJob");
  try {
    const { title, type, description, company, location, salary, experienceLevel, applicationDeadline, requirements } = req.body;
    const job = await Job.create({ title, type, description, company, location, salary, experienceLevel, applicationDeadline, requirements });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  //res.send("getJobById");
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  try {
    const job = await Job.findById(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      return res.status(404).json({ message: "Job not found", error: error.message } );
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve job", error: error.message } );
    }
  
};

// PUT /jobs/:jobId
const updateJob = async (req, res) => {
  //res.send("updateJob");
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID", error: error.message });
  }

  try {
    const updatedJob = await Job.findOneAndUpdate (
      { _id: jobId },
      { ...req.body },
      { new: true }
    );
    if (updatedJob) {
      res.status(200).json(updatedJob);
    } else {
      return res.status(404).json({ message: "Job not found", error: error.message });
    }

  } catch (error) {
    return res.status(500).json({ message: "Failed to update job", error: error.message });
  }
};

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  //res.send("deleteJob");
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID", error: error.message });
  }
  try {
    const deletedJob = await Job.findOneAndDelete({ _id: jobId});
    if (deletedJob) {
      res.status(200).json(deletedJob);
    } else {
      return res.status(404).json({ message: "Job not found", error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
