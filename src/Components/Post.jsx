import React from "react";
import PersonIcon from "@mui/icons-material/Person";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import CommentIcon from "@mui/icons-material/Comment";
import "./community.css";
import Commentinput from "./Commentinput";

import { useState } from "react";



function Post({ posts }) {
   // State to hold the ID of the post for which the user wants to comment
   const [selectedPostId, setSelectedPostId] = useState(null);
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li className="border my-2" key={post.id}>
            <div className="row">
              <div className="col-4">
                <button className="border rounded-circle m-2">
                  <PersonIcon />
                </button>
                <span className="fw-bolder">{post.user.username}</span>
              </div>
              <div className="col-2 d-flex justify-content-end align-items-center ms-auto">
                
              </div>
            </div>
            <div className="container">
              <p>{post.content}</p>
              <p>{post.id}</p>
            </div>
            <div className="row">
              <div className="col-12">
                <button className="btn border-0 me-1">
                  <FavoriteBorderIcon className="me-2" />
                  Likes
                </button>

                <button
                  className="btn border-0 me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#commentmodal"
                  data-post-id={post.id} // Store the post ID in a data attribute
                  

                  onClick={() => {
                    setSelectedPostId(post.id); // Set the selected post ID
                    console.log(`Selected Post ID: ${post.id}`); // Log the post ID or handle it accordingly
                  }}
                >
                  <CommentIcon className="me-2" />
                  Comments
                </button>
                
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Comment Modal */}

      <div className="modal" id="commentmodal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title text-center">
                Community & Jobs in tech
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              {/* Pass the selectedPostId as a prop to CommentInput */}
              <Commentinput postId={selectedPostId}/>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
