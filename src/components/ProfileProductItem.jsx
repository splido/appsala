import { FaStar } from 'react-icons/fa'
import {MdOutlineCategory} from 'react-icons/md'
import { LiaCommentSolid } from 'react-icons/lia'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useState,useEffect } from 'react'
import RatingPopup from './RatingPopup'
import StarRating from './StarRating'
import StatusPopup from './StatusPopup'
import CommentPopup from './CommentPopup'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { updateUserData } from "../Reducers/userReducer";


function ProfileProductItem({info,savedApp}) {
  // console.log(info)
  const dispatch = useDispatch();
  const [saved, setSaved] = useState()
  const [followingApp, setFollowingApp] = useState()
  const currentUser = useSelector((state) => state?.user?.products?.data?.saved);
  const currentUserApps = useSelector((state) => state?.user?.products?.data?.following_app);
  // const followingApps = 
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
const selector = (val)=>{
  // console.log(val)
  if (val?.startsWith('I am')){
  return 'option1'
  }if (val?.startsWith('Yes')){
  return 'option2'}
  if (val?.startsWith('May')){
  return 'option3'}
  if (val?.startsWith('No, i')){
  return 'option4'}
  else{
   return 'option5'
    }
}
const id = localStorage.getItem('userId')
useEffect(() => {
 
  if(savedApp){
    var filteredProducts = currentUser?.filter((product) => product?._id === info?._id)[0];
    setSaved(filteredProducts);
    setSelectedDropdownValue(selector(filteredProducts?.status))
}else{
 var filteredProduct = currentUserApps?.filter((product) => product?._id === info?._id)[0];
 setFollowingApp(filteredProduct)
 setSelectedDropdownValue(selector(filteredProduct?.status));
}

}, [info,currentUser,currentUserApps]);




const [showOverlay, setShowOverlay] = useState(false);
const [commentsPopup, setCommentsPopup] = useState(false);
const [ratingPopup, setRatingPopup] = useState(false);
const [ statusPopup, setStatusPopup] = useState(false);
const handleOverlayDoubleClick = () => {
  setShowOverlay(false);
};
if(info?.subscription?.date){

  var inputDate = new Date(info.subscription.date);
  var formattedDate = inputDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}else{
 formattedDate = ''
}

if (followingApp){
  // console.log(followingApp)
  var comments = followingApp?.subscription?.comment.length  
}
else if(savedApp){
  var comments = currentUser?.find((app)=> app?._id === info?._id)?.comment.length;
}
else{
   comments = 0
}

if(followingApp){
  var rating = followingApp?.subscription?.user_ratings[0]?.rating
  if(rating){
    var ratingValues = Object.values(rating);
    var totalValues = ratingValues.length;
    var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var average = sum / totalValues;
  }
 
}
 else if(savedApp){
  var filteredProducts = currentUser?.filter((product) => product?._id === info?._id)[0];
  var rating = filteredProducts?.user_ratings[0]?.rating
  if(rating){
    var ratingValues = Object.values(rating);
    var totalValues = ratingValues.length;
    var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var average = sum / totalValues
  }
 
}
else{
  average = 0
}

// console.log(average)

if (info?.obj_id?.logo){
  var logo = info.obj_id.logo
}else{
    logo = info.logo
}

if (info?.obj_id?.name){
  var name = info.obj_id.name
}else{
    name = info.name
}
if (info?.obj_id?.shortDescription){
  var shortDescription = info.obj_id.shortDescription
  const words = shortDescription.split(/\s+/);
  // Get the first 20 words
  const first20Words = words.slice(0, 20).join(" ");
    shortDescription = first20Words + '...'
}else{
    shortDescription = info.shortDescription
  const words = shortDescription.split(/\s+/);
  // Get the first 20 words
  const first20Words = words.slice(0, 20).join(" ");
    shortDescription = first20Words + '...'
}
if (info?.subscription?.package){
  var subscriptionPackage =info.subscription.package
}else{
    subscriptionPackage = ''
}
if (info?.subscription?.amount){
  var subscriptionAmount =info.subscription.amount
}else{
    subscriptionAmount =  ''
 
}

if (info?.obj_id?.Category){
  var category =info.obj_id.Category
const convertedText = category
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
    category = convertedText
}else{
    category = info.Category
  const convertedText = category?.split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
    category = convertedText
}

const handleDropdownChange = async(e) => {
  // const selectedValue = event.target.value;
  if(e.target.value === 'option1'){
    setStatusPopup(true)
    setShowOverlay(true);
    setCommentsPopup(false)
    setRatingPopup(false)
  }
 
  // var selectedValue = selector(e.target.value)
  setSelectedDropdownValue(e.target.value);
  if (e.target.value === 'option1'){
    var currentStatus = 'I am using it 👍'}
    if (e.target.value === 'option2'){
        currentStatus = 'Yes, i want to 🤩'}
      if (e.target.value === 'option3'){
          currentStatus = 'Maybe 🤔'}
        if (e.target.value === 'option4'){
            currentStatus = "No, i don't 😑"}
          

// if(savedApp){
//   var applicationID = info?._id
// }
// else if(followingApp[0]?._id){
//   applicationID = followingApp[0]?._id
// }else{
//   applicationID = ''
// }

var applicationID = info?._id
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/update-status/${applicationID}`
  // console.log(applicationID)
 console.log(apiUrl)
  const authToken = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: currentStatus }),
  };

  try {
    console.log(requestOptions)
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log("Response data:", data);
    dispatch(updateUserData(id))    
  } catch (error) {
    console.error("Error:", error);
  }
  console.log('done calling')
  
};

const handleCommentPopup = () => {
  setShowOverlay(true);
  setCommentsPopup(true)
  setRatingPopup(false)
  setStatusPopup(false)
}

const handleRatingPopup = () => {
  setShowOverlay(true);
  setCommentsPopup(false)
  setRatingPopup(true)
  setStatusPopup(false)
}

  return (
    <>
        <div className="profile-products-list">
        <div className='profile-product-image'>
        <img src={logo} alt="" style={{height:'60px'}}/>
        </div>
        <div>
        <div className='aligned'>
        <h3 style={{color: 'black'}}>{name}</h3>
        <div className="stars">
        <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
        </div>
        <p>(149 Follows)</p>
        </div>
        <p> {shortDescription}</p>
        <div className='aligned'>
            
            <div  className='aligned'>
            <MdOutlineCategory/>
            <p>Marketing</p>
            <FaArrowCircleRight/>
            <p>{category}</p>
            </div>
         
           
          {
           
            <>
            <p style={{marginRight: '4px'}}>My Rating</p>
        <div className="stars"  onClick={handleRatingPopup}>
        <StarRating rating={average}/>
        </div>
            </>   
          }
       
   
       {
           <>
        <LiaCommentSolid onClick={handleCommentPopup} style={{marginRight: '4px'}}/>
         <p>comment <span style={{color: '#00A82D'}}>({comments})</span></p>
        </>  
       }
          
        </div>
        </div>
        <div style={{marginTop: '20px'}}>
        <div>
        <select id="dropdown" onChange={handleDropdownChange} value={selectedDropdownValue} >
        <option value="option1" name='hello'>🟢 I am using it </option>
        <option value="option2"  name='Yes, I want to 🤩'>🟢 Yes, I want to </option>
         <option value="option3"  name='May be 🤔'>🟢 May be 🤔</option>
         <option value="option4" name="'No, I don't 😐'">🟢 No, I don't </option>
         <option value="option5" name="No Status">⚫ Select</option>
        </select>
          </div>
          <p>{subscriptionPackage} {subscriptionAmount}
          {
            subscriptionPackage && <>$</>
          }
          </p>
          <p>{formattedDate}</p>
        </div>
    </div>

    {showOverlay && commentsPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={info} id={id} savedApp={savedApp}/>
        </div>
  )}

  {showOverlay && ratingPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup info={info} setRatingPopup={setRatingPopup} id={id} savedApp={savedApp}/>
        </div>
  )}

{showOverlay && statusPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <StatusPopup info={info} id={id} setShowOverlay={setShowOverlay} setStatusPopup={setStatusPopup}/>
        </div>
  )}
    </>
  )
}

export default ProfileProductItem