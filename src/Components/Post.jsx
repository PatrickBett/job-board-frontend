import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import "./community.css";
import Commentinput from "./Commentinput";

import { useState } from "react";
function Post({ posts }) {
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
                <button className="btn  me-3 ">
                  <EditIcon />
                </button>
                <button className="btn ">
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="container">
              <p>{post.content}</p>
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
                >
                  <CommentIcon className="me-2" />
                  Comments
                </button>
                <button className="btn border-0 ">
                  <ShareIcon className="me-2" />
                  Share
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
              <Commentinput posts={posts} />
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
