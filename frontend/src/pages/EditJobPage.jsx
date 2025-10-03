import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
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
    postedDate: new Date.now(),
    status: "Open", //Open, Closed
    applicationDeadline: null, //Date
    requirements: [],
  });
  const [newJob, setNewJob] = useState(job);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const updateJob = async (updatedJob) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
        });
      if (!res.ok) {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
        try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job");
      }
            const data = await res.json();
            setJob(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchJob();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    setNewJob(job);

    setJob({
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
    postedDate: new Date.now(),
    status: "Open", //Open, Closed
    applicationDeadline: null, //Date
    requirements: [],
  }) // Reset form

    const success = await updateJob(newJob);
    if (success) {
      // toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } else {
      // toast.error("Failed to update the job");
    }
  };

    return (
    <div className="create">
      <h2>Update Job</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
          <button>Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;