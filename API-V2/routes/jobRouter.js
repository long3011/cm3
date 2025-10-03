const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth)
router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:jobId", getJobById);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
