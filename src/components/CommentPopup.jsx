import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import CommentList from "./CommentList";
import { updateUserData } from "../Reducers/userReducer";
// Function to sort comments by date in descending order


function CommentPopup({ info, savedApp }) {
  const [ID, setID] = useState("")
  // console.log(info._id)
  const [comment, setComment] = useState("");
  var savedComments = useSelector((state) => state.user?.products?.data?.saved?.find((app)=> app?.obj_id === info?._id)?.comment) || [];
  // console.log(savedComments)
  var currentComments = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app?.obj_id?._id === info?.obj_id?._id)?.subscription?.comment) || [];
  const [comments, setComments] = useState(currentComments);
  // console.log(typeof(comments))
 
  const authToken = localStorage.getItem("access_token")
  // if( info?.obj_id?._id){
  //   var ID = info?.obj_id?._id
  // }else{
  //   var ID = info?._id
  // }
  // const ID = info?.obj_id?._id || info._id
  // console.log(ID)
  const apiUrl = `https://appsalabackend-p20y.onrender.com/comment/${ID}`;
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => { 
  
    // dispatch(fetchUser(null));
    // console.log(info)
    if( info?.obj_id?._id){
     setID(info?.obj_id?._id)
    }else{
     setID(info?._id)
    }
    if(savedApp){
      setComments(savedComments)
    }else{
      setComments(currentComments)
    }
    // setComments(currentComments);
    // console.log('calling fetch')

  }, [info, setID, savedApp,currentComments,savedComments]);

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

      // Add the new comment to the top of the comments list with the current date
      const newComment = {comment, createdAt: new Date().toISOString() };
      setComments((prevComments) => [ ...prevComments,newComment]);
      dispatch(updateUserData(userId))   
      // localStorage.setItem({
      //   comments: JSON.stringify(sortCommentsByDate(comments)),
      // })
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
        {/* {comments.map((comment, index) => (
          <CommentList key={comment._id} comment={comment} setComments={setComments} comments={comments} />
        ))} */}
 {comments.slice().reverse().map((comment, index) => (
          <CommentList key={index} comment={comment} setComments={setComments} comments={comments}  />
        ))}

      </div>
      </div>
)}

export default CommentPopup;

