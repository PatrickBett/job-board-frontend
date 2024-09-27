import React, { useEffect, useState } from "react";
import "./community.css";
import Form from "./Form";
import api from "../api";
import Post from "./Post";

function Community() {
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await api.get("/api/posts/");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const createNewPost = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/posts/", { content });
      console.log(res.data);
      setPosts([res.data, ...posts]); // Add the new post to the list
      setContent(""); // Clear the content after a successful post

      alert("Post added successfully");
    } catch (error) {
      alert("Error adding post");
      console.error(error);
    }
  };

  return (
    <div className="container border ">
      <div className="row">
        <div className="col-8">
          <Form />
        </div>
        <div className="col-4">
          <button
            className="btn btn-success my-2"
            data-bs-target="#mymodal"
            data-bs-toggle="modal"
          >
            Add post
          </button>
        </div>
      </div>

      <div id="mymodal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Post</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={createNewPost}>
                <label htmlFor="content" className="form-label">
                  Content:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-3">
        <Post posts={posts} />
      </div>
    </div>
  );
}

export default Community;
