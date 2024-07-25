import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    updateUserData,
    postComment,
    deleteComment
  } from "../../Reducers/userReducer";
import userImg from "../../assets/img/user.png";
import { toast } from "react-hot-toast";


const CommentComponent = ({userComments,setUserComments,productId}) => {
    const dispatch = useDispatch();  
    const id = localStorage.getItem("userId");
    const [comment, setComment] = useState("");

    
  const handlePostComment = async (e) => {
    e.preventDefault();
    const body = {
      Id: productId,
      comment: comment,
    };
    try {
      await dispatch(postComment(body)).unwrap();
      const newComment = { comment, createdAt: new Date().toISOString() };
      setUserComments((prevComments) => [...prevComments, newComment]);
      await dispatch(updateUserData(id)).unwrap();
      setComment(" ");
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const DeleteComment = async (id) => {
    try {
      await dispatch(deleteComment(id)).unwrap();
      const updatedComments = userComments.filter(
        (comment) => comment._id !== id
      );
      setUserComments(updatedComments);
      await dispatch(updateUserData(id)).unwrap();
    } catch (error) {
        toast.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="card-open-comment">
    <p className="dark-text dark-text-heading">My Comments</p>
    <div className="comment-input">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="btn btn-light" onClick={handlePostComment}>
        Comments
      </div>
    </div>
    <div className="comments">
      {userComments &&
        userComments.map((comment) => (
          <div className="comment flex" key={comment._id}>
            <div>
              <div className="flex">
                <img src={userImg} alt="" />
                <p className="dark-text">28 Minutes ago</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => DeleteComment(comment?._id)}
                >
                  <rect
                    width="24"
                    height="24"
                    rx="12"
                    fill="#FFD6E8"
                  />
                  <path
                    d="M14.228 9.94252V16.5134H8.97126V9.94252H14.228ZM13.2423 6H9.95689L9.2998 6.65709H7V7.97126H16.1992V6.65709H13.8994L13.2423 6ZM15.5421 8.62835H7.65709V16.5134C7.65709 17.2362 8.24847 17.8276 8.97126 17.8276H14.228C14.9508 17.8276 15.5421 17.2362 15.5421 16.5134V8.62835Z"
                    fill="#F11A7B"
                  />
                </svg>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  </div>
  )
}

export default CommentComponent