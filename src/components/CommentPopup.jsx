import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import CommentList from "./CommentList";
import { updateUserData } from "../Reducers/userReducer";


function CommentPopup({ info, savedApp }) {
  const [ID, setID] = useState("")
  const [comment, setComment] = useState("");
  var savedComments = useSelector((state) => state.user?.products?.data?.saved?.find((app)=> app?._id === info?._id)?.comment) || [];
  var currentComments = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app?._id === info?._id)?.subscription?.comment) || [];
  const [comments, setComments] = useState(currentComments) 
  const authToken = localStorage.getItem("token")
  const apiUrl = `https://appsala-backend.netlify.app/.netlify/functions/index/comment/${ID}`;
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
  
  }, [info,setID, savedApp,savedComments, currentComments]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    };

    try {
      console.log(comment)
      console.log(requestOptions)
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log("Response data:", data);
      const newComment = {comment, createdAt: new Date().toISOString() };
      setComments((prevComments) => [ ...prevComments,newComment]);
      dispatch(updateUserData(userId))   
      setComment("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="comment-popup">
       <div className="comment-heading">
    <h3>My Comments</h3>  
     <p>Tell us about your experience</p>
    </div>
    <div className="line"></div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="4"
        />
        <button type="submit" className="button" style={{height: '50px', marginTop: '30px'}}>Comment</button>
      </form>

      <div className="comments-section">
        <h3 className="comment-heading">Previous Comments</h3>

 {comments.slice().reverse().map((comment, index) => (
          <CommentList key={index} comment={comment} setComments={setComments} comments={comments}  />
        ))}

      </div>
      </div>
)}

export default CommentPopup;

