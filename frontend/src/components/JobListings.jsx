import JobListing from "./JobListing";

const JobListings = ({jobs}) => {
  return (
    <div className="job-list">
      {jobs.map(job => (
        <JobListing job={job} key={job._id} />
      ))}
    </div>
  );
};

export default JobListings;
