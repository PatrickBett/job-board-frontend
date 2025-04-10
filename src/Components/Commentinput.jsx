import React, { useState, useEffect } from "react";
import api from "../api";
import PersonIcon from "@mui/icons-material/Person";

function Commentinput({postId }) {

  const [postcomments,setpostcomments] = useState([])
  const [comment,setComment] = useState("")

  useEffect(
    ()=>{
      getpostcomments()
    },[postId]
  )
// Function to get comments of each post.
  const getpostcomments = async()=>{
    
    try{
      const res = await api.get('/api/post/comments/')

      const filteredComments = res.data.filter(
        (comment) => comment.post.id === postId
      );
      setpostcomments(filteredComments)
      console.log(filteredComments)
      
  
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
    
    setpostcomments([...postcomments, res.data]); // Add the new comment to the list

    alert("success")
    comment("")
  }
  catch(error){
    console.log(error)
    alert("Submission failed!!!")
  } 
}



  return (
    <>
    
      <form onSubmit={postcomment} className="formcomment">
        <label htmlFor="comment">Comment</label>
        <textarea rows="4" className="form-control" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
        <button className="btn btn-secondary me-2 my-2" data-bs-dismiss="formcomment">Cancel</button>
        <button className="btn btn-primary my-2" type="submit">
          Comment
        </button>
      </form>

      <div className="row border">

        {postcomments.length > 0 ?

        <ul>
        {postcomments.map(
          (comment)=>(
            
            <li key={comment.id}>
              <div className="border mt-2 p-4">
              <PersonIcon />
              {comment.user.username}
              <p>{comment.comment}</p>
              </div>
            </li>
            
          )
        )}
        </ul>
        :<p>No comments yet!!!</p>
        }
      </div>
    </>
  );
}

export default Commentinput;
