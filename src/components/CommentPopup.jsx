import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import CommentList from "./CommentList";
import { updateUserData,postComment } from "../Reducers/userReducer";


function CommentPopup({ info, savedApp }) {
  const [ID, setID] = useState("")
  const [comment, setComment] = useState("");
  var savedComments = useSelector((state) => state.user?.products?.data?.saved?.find((app)=> app?._id === info?._id)?.comment) || [];
  var currentComments = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app?._id === info?._id)?.subscription?.comment) || [];
  const [comments, setComments] = useState(currentComments) 
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
// console.log(info)
  useEffect(() => { 

    if(info?._id){
     setID(info?._id)
    }
    
    if(savedApp){
      setComments(savedComments)
    }else{
      setComments(currentComments)
    }
  
  }, [info,setID, savedApp,savedComments, currentComments,comments]);

  const handleChange = async (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body ={
      Id: ID,
      comment: comment
    }

    try {
      await dispatch(postComment(body)).unwrap();
      const newComment = {comment, createdAt: new Date().toISOString() };
      setComments((prevComments) => [ ...prevComments,newComment]);
      await dispatch(updateUserData(userId)).unwrap(); 
      setComment("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="comment-component overlay-card">
    <h2>My Comments</h2>  
     <p>Tell us about your experience</p>    
    <div className="line"></div>
      <form onSubmit={handleSubmit} className="comment-input">
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="4"
        />
        <button type="submit" className="btn btn-light" onClick={handleSubmit}>Comment</button>
      </form>
      <h3 style={{alignSelf: "center"}}>Previous Comments</h3>
      <div className="comments">
       

 {comments.slice().reverse().map((comment, index) => (
          <CommentList key={index} comment={comment} setComments={setComments} comments={comments}  />
        ))}

      </div>
      </div>
)}

export default CommentPopup;

