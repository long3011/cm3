import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [job, setJob] = useState({
    title: "",
    type: "Full-Time",
    description: "",
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      size: 0,
    },
    location: "",
    salary: 0,
    experienceLevel: "Entry", //Entry, Mid, Senior
    postedDate: Date.now(),
    status: "Open", //Open, Closed
    applicationDeadline: null, //Date
    requirements: [],
  });

  const navigate = useNavigate();
 
  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    addJob(job);
    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <label>Job type:</label>
        <select value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={job.company.name}
          onChange={(e) => setJob({ ...job, company: { ...job.company, name: e.target.value } })}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={job.company.contactEmail}
          onChange={(e) => setJob({ ...job, company: { ...job.company, contactEmail: e.target.value } })}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={job.company.contactPhone}
          onChange={(e) => setJob({ ...job, company: { ...job.company, contactPhone: e.target.value } })}
        />
        <label>Company Website:</label>
        <input
          type="text"
          required
          value={job.company.website}
          onChange={(e) => setJob({ ...job, company: { ...job.company, website: e.target.value } })}
        />
        <label>Company Size:</label>
        <input
          type="number"
          required
          value={job.company.size}
          onChange={(e) => setJob({ ...job, company: { ...job.company, size: e.target.value } })}
        />

        <label>Location:</label>
        <input
          type="text"
          required
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
        />
        <label>Salary:</label>
        <input
          type="number"
          required
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
        />
        <label>Experience Level:</label>
        <select
          value={job.experienceLevel}
          onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <label>Job Status:</label>
        <select value={job.status} onChange={(e) => setJob({ ...job, status: e.target.value })}>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <label>Application Deadline:</label>
        <input
          type="date"
          required
          value={job.applicationDeadline}
          onChange={(e) => setJob({ ...job, applicationDeadline: e.target.value })}
        />
        <label>Job Requirements:</label>
        <input
          type="text"
          required
          value={job.requirements}
          onChange={(e) => setJob({ ...job, requirements: e.target.value.split(",") })}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;