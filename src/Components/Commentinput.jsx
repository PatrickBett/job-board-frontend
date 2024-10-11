import React, { useState, useEffect } from "react";
import api from "../api";

function Commentinput({postId }) {

  const [postcomments,setpostcomments] = useState([])
  const [comment,setComment] = useState("")

  useEffect(
    ()=>{
      getpostcomments()
    },[]
  )
// Function to get comments of each post.
  const getpostcomments = async()=>{
    
    try{
      const res = await api.get('/api/post/comments/')
      // setpostcomments(res.data)
      console.log(res.data)
      console.log("success postcomments")
    }
    catch(error){
      console.log(error)
    }
  }
//Function to post comments of a post

const postcomment = async(e)=>{
  e.preventDefault();

  
  try{
    const res = await api.post('/api/post/comments/',{post:postId , comment});
    console.log(res.data)
    // setpostcomments([...postcomments, res.data])
    // console.log({comment})

    alert("success")
  }
  catch(error){
    
    console.log(comment,postId)
    console.log(error)
    alert("Submission failed!!!")
  } 
}



  return (
    <>
    
      <form onSubmit={postcomment}>
        <label htmlFor="comment">Comment</label>
        <textarea rows="4" className="form-control" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
        <button className="btn btn-secondary me-2 my-2">Cancel</button>
        <button className="btn btn-primary my-2" type="submit">
          Comment
        </button>
      </form>

      <div className="row border">
        <p>No comments</p>
      </div>
    </>
  );
}

export default Commentinput;
