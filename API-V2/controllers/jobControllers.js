const Job = require("../models/jobModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllJobs = async (req, res) => {
  try{
    const jobs = await Job.find({}).sort({createdAt:-1});
    res.status(200).json(jobs)
  } catch(error){
    res.status(500).json({message: error})
  }
};

// POST /jobs
const createJob = async (req, res) => {
  try{
    const job = await Job.create({...req.body})
    res.status(200).json(job)
  }catch(error){
    res.status(500).json({message: error})
  }
};

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  const {jobId} = req.params
  if (!mongoose.Types.ObjectId.isValid(jobId)){
    return res.status(400).json({message: "Invalid id"})
  }
  try{
    const job = await Job.findById(jobId)
    res.status(200).json(job)
  }catch(error){
  res.status(500).json({message: error})
  }
};

// PUT /jobs/:jobId
const updateJob = async (req, res) => {
  const {jobId} = req.params
  if(!mongoose.Types.ObjectId.isValid(jobId)){
    return res.status(400).json({message: "Not valid id"})
  }
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      { _id: jobId },
      { ...req.body }, 
      { new: true }
    )
    if (updatedJob){
      res.status(200).json({message:"Success: ",updatedJob})
    }else {
      res.status(404).json({ message: "Job not found" });
    }

  }catch(error){
    res.status(500).json({message: error})
  }

};

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  const {jobId} = req.params
  if(!mongoose.Types.ObjectId.isValid(jobId)){
    return res.status(400).json({message: "Not valid id"})
  }
  try{
    const deletedJob = await Job.findByIdAndDelete(jobId)
    if(deletedJob){
      res.status(204).send(); //204 no content
    } else {
      res.status(404).json({message: "Job not found"})
    }
  } catch(error){
    res.status(500).json({message: "Failed to delete job"})
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
