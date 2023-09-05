// import { useState, useEffect } from "react"
// import io from 'socket.io-client';
// import CommentList from "./CommentList"
// import { useDispatch } from 'react-redux';
// import { fetchUser } from '../Reducers/userReducer'
// function CommentPopup({info, id}) {
//   const [comment, setComment] = useState('')
//   const [comments, setComments] = useState(info.subscription.comment)
//   console.log('comments',comments)
// //   const socket = io("https://appsalabackend-p20y.onrender.com", {
// //   transports: ["websocket"],
// // })
//   const dispatch = useDispatch();
//   const userId = localStorage.getItem('userId')

//   // useEffect(() => {
//   //   // Listen for real-time new comment event
//   //   socket.on('newComment', (newComment) => {
//   //     setComments((prevComments) => [...prevComments, newComment]);
//   //   });
//   //   return () => {
//   //     // Disconnect the socket when the component unmounts
//   //     socket.disconnect();
//   //   };
//   // }, [socket]);
//   // console.log('comming comments',comments)
//   // const commentsList = info.subscription.comment
//   // console.log('comming commentsList',commentsList)
//   const applicationId = info.obj_id._id
//   const authToken = localStorage.getItem('access_token')
//   // console.log(id)
//   const apiUrl = `https://appsalabackend-p20y.onrender.com/comment/${applicationId}`;  

//   const handleChange = (e) => {
//     setComment(e.target.value)

//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setComment(''); 
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         "Authorization": `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ comment: comment }),
//     };
//     console.log(requestOptions)
//     try {
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
//       console.log('Response data:', data);
//       // dispatch(fetchUser(userId));
//       // setComments(info.subscription.comment)
//       // setComments('')
//       // setComments([...comments, comment]);
//       // console.log('new comments',comments)
//       // Handle the response data here
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle errors here
//     }
//   };
  

//   return (
//     <>
//     <div className="comment-popup">
//       <div className="comment-heading">
//         <h3>My Comments</h3>  
//       <p>Tell us about your experience</p>
//     </div>
//     <div class="line"></div>
//       <form action="" className="comment-form" onChange={handleChange} onSubmit={handleSubmit}>
//         <textarea name="" id="" cols="30" rows="10"></textarea>
//         <button className="button">Comment</button>
//       </form>
//       <div className="comments-section">
//       <h3 className="comment-heading">Previous Comments</h3>
   
  
       
//         {
//  comments?.map((comment)=>(   
//   <CommentList comment={comment}/>
// ))
//         }
        
//     </div>
//       </div>

//     </>
//   )
// }

// export default CommentPopup


// import React, { useState, useEffect } from "react";
// import io from 'socket.io-client';
// import CommentList from "./CommentList";



// function CommentPopup({ info }) {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState(info.subscription.comment);

//   const userId = localStorage.getItem('userId');
//   const authToken = localStorage.getItem('access_token');
//   const apiUrl = `https://appsalabackend-p20y.onrender.com/comment/${info.obj_id._id}`;

//   const socket = io("https://appsalabackend-p20y.onrender.com/", {
//     transports: ["websocket"],
//   });
//   useEffect(() => {
//     // Listen for real-time new comment event
//     socket.on('newComment', (newComment) => {
//       console.log('New comment received:', newComment);

//       // Update comments using the spread operator
//       setComments((prevComments) => [...prevComments, newComment]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   const handleChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     socket.emit('newComment', { comment: comment });

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         "Authorization": `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ comment: comment }),
//     };

//     try {
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
//       console.log('Response data:', data);

//       setComment('');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="comment-popup">
//       <form onSubmit={handleSubmit} className="comment-form">
//         <textarea
//           value={comment}
//           onChange={handleChange}
//           placeholder="Write your comment..."
//           rows="4"
//         />
//         <button type="submit">Comment</button>
//       </form>

//       <div className="comments-section">
//         <h3 className="comment-heading">Previous Comments</h3>
//         {comments.slice().reverse().map((comment, index) => (
//           <CommentList key={comment._id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CommentPopup;

import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import CommentList from "./CommentList";
import { updateUserData } from "../Reducers/userReducer";
// Function to sort comments by date in descending order
const sortCommentsByDate = (comments) => {
  return comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

function CommentPopup({ info }) {
  console.log(info)
  const [comment, setComment] = useState("");
  const currentComments = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app.obj_id._id === info.obj_id._id).subscription.comment);
  // console.log('currentComments',currentComments)
  const [comments, setComments] = useState(currentComments);
 
  const authToken = localStorage.getItem("access_token");
 
  const apiUrl = `https://appsalabackend-p20y.onrender.com/comment/${info.obj_id._id}`;
  const dispatch = useDispatch();
  useEffect(() => { 
    const userId = localStorage.getItem("userId");
    // dispatch(fetchUser(null));
    dispatch(updateUserData(userId))   
    setComments(currentComments);
    // console.log('calling fetch')

  }, []);

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
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log("Response data:", data);

      // Add the new comment to the top of the comments list with the current date
      const newComment = {comment, createdAt: new Date().toISOString() };
      setComments((prevComments) => [newComment, ...prevComments]);
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
    <div class="line"></div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="4"
        />
        <button type="submit" className="button">Comment</button>
      </form>

      <div className="comments-section">
        <h3 className="comment-heading">Previous Comments</h3>
        {comments.map((comment, index) => (
          <CommentList key={comment._id} comment={comment} setComments={setComments} comments={comments} />
        ))}

      </div>
      </div>
)}

export default CommentPopup;

