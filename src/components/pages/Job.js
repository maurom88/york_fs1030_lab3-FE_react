import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Job() {
  let params = useParams();
  const jobId = params.id;

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState();

  useEffect(() => {
    const url = `http://localhost:5000/jobs/${jobId}`;

    fetch(url, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setJob(data[0]))
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => handleFetchError(err));

    function handleFetchError(err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      {loading || !job ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{job?.title}</h2>
          <div className="job-div">
            <p className="job-p">{job.description}</p>
            <p className="job-p">{job.location}</p>
            <Link to={`/jobs/${jobId}/edit`}>Edit job</Link>
          </div>
        </div>
      )}
    </div>
  );
}
