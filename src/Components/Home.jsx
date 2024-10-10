import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./home.css";
import { format } from 'date-fns';


function Home() {
  const [jobs, setJobs] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const handleApplication = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/api/application/", {});
      alert("Application successful");
    } catch (error) {
      alert(error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await api.get("/api/jobs/");
      console.log(res.data);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
//Change time to a human readable format.
  const formatDate = (isoString) => {
    return format(new Date(isoString), 'MMMM dd, yyyy HH:mm:ss'); // Customize the format as needed
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid border shadow">
      

      {/* Search Input */}
      <div className="row mb-4 mt-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
          />
        </div>
      </div>

      <ul className="list-unstyled">
        {filteredJobs.map((job, index) => (
          <li className="border px-4 py-2" key={index}>
            <div className="row">
              <div className="col-11">
                <h3>{job.title}</h3>
              </div>
              <div className="col-1">
                <FavoriteBorderIcon style={{ color: "green" }} />
              </div>
            </div>
            <p>{job.description}</p>
            <div className="row">
              <div className="col-4">
                <p className="fw-bolder">Budget ${job.budget}</p>
              </div>
              <div className="col-4">
                <p className="fw-bolder">Location</p> {job.location}
              </div>
              <div className="col-4">
                <p className="fw-bolder">Company</p> {job.company}
              </div>
            </div>

            <div className="row mt-5 mb-3">
              <div className="col-6">
                <button
                  className="btn btn-success w-100"
                  data-bs-target="#mymodal"
                  data-bs-toggle="modal"
                >
                  Apply Now
                </button>
              </div>
              <div className="col-6 text-md-right text-center mt-3 mt-md-0">
                <span className="text-muted">Posted {formatDate(job.time)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Application Form */}
      <div className="modal" id="mymodal">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Application</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleApplication}>
                <label htmlFor="resume">Upload Resume</label>
                <input type="file" className="form-control" />
                <label htmlFor="cv">Upload CV</label>
                <input type="file" className="form-control" />
                <label htmlFor="cover">Upload Cover letter</label>
                <input type="file" className="form-control" />
                <label htmlFor="aob">Any Other Comment</label>
                <textarea rows="4" className="form-control" />
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button className="btn btn-danger" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
