import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./home.css";
import Form from "./Form";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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
  return (
    <div className="container-fluid border shadow">
      <Form />

      <ul className="list-unstyled">
        {jobs.map((job, index) => (
          <li className="border px-4 py-2" key={index}>
            <div className="row">
              <div className="col-11">
                <h3>{job.title}</h3>
              </div>
              <div className="col-1">
                <FavoriteBorderIcon style={{ color: "green" }} />
                {/* {isFavorite ? (
                  <FavoriteBorderIcon
                    style={{ color: "green" }}
                    onClick={toggleFavorite}
                  />
                ) : (
                  <FavoriteBorderIcon
                    style={{ color: "red" }}
                    onClick={toggleFavorite}
                  />
                )} */}
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
              <div className="col-6 ">
                <button
                  className="btn btn-success w-100"
                  data-bs-target="#mymodal"
                  data-bs-toggle="modal"
                >
                  Apply Now
                </button>
              </div>
              <div className="col-6  text-md-right text-center mt-3 mt-md-0">
                <span className="text-muted">Posted {job.date_created}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="modal" id="mymodal">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Add Post</h1>
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
