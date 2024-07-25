import user from '../assets/img/user.png'
import { deleteComment,updateUserData } from '../Reducers/userReducer';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
function CommentList({comment, setComments, comments}) {

  useEffect(() => {
    console.log(comments)
  }, [comments])
  

// Convert the timestamp to a Date object
const date = new Date(comment?.createdAt);

// Define options for formatting the date
const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Format the date as "August 20, 2023"
const formattedDate = date.toLocaleDateString('en-US', options);
const userId = localStorage.getItem("userId");

const dispatch = useDispatch();

const DeleteComment = async(id) => {

  try {
    await dispatch(deleteComment(id)).unwrap();
    const updatedComments = comments.filter(comment => comment._id !== id);
    setComments(updatedComments);
    await dispatch(updateUserData(userId)).unwrap(); 
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
}
  return (
    <div className="comment flex">
    <div>
    <div className="flex">
    <img src={user} alt="" />
        <p className="dark-text">28 Minutes ago</p>
    </div>
    <p>{comment?.comment}</p></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={()=>DeleteComment(comment?._id)}>
            <rect width="24" height="24" rx="12" fill="#FFD6E8"/>
            <path d="M14.228 9.94252V16.5134H8.97126V9.94252H14.228ZM13.2423 6H9.95689L9.2998 6.65709H7V7.97126H16.1992V6.65709H13.8994L13.2423 6ZM15.5421 8.62835H7.65709V16.5134C7.65709 17.2362 8.24847 17.8276 8.97126 17.8276H14.228C14.9508 17.8276 15.5421 17.2362 15.5421 16.5134V8.62835Z" fill="#F11A7B"/>
          </svg>
</div>

  )
}

export default CommentList