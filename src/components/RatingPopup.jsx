import { useState, useEffect } from 'react';
import { updateUserData,updateUserRatings } from "../Reducers/userReducer";
import { useDispatch,useSelector } from "react-redux";
import StarRating from './StarRating';
import { toast } from 'react-hot-toast';
function RatingPopup({info,setRatingPopup, savedApp}) {
  const [ID, setID] = useState("")
  console.log(info)
  var currentRatings = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app?._id === info?._id)?.subscription?.user_ratings) || []; 
  var savedRatings = useSelector((state) => state.user?.products?.data?.saved?.find((app)=> app?._id === info?._id)?.user_ratings) || [];

  if(savedApp){
    if (savedApp && Array.isArray(savedRatings) && savedRatings.length > 0 && savedRatings[0]?.rating){
      currentRatings = savedRatings[0]?.rating;
    }
  }
  else if (Array.isArray(currentRatings) && currentRatings.length > 0 && currentRatings[0]?.rating) {
    currentRatings = currentRatings[0]?.rating;
  }
  else {
    currentRatings = []; // Replace 'defaultValue' with the value you want to assign when user_ratings is an empty array
  }
  
  // Now you can use 'currentRatings' with confidence
  
  const userRatings = info?.subscription?.user_ratings[0]?.rating || {};
  // console.log(userRatings)

  const [selectedRatings, setSelectedRatings] = useState({
    Usability: userRatings.Usability || 0, // Set a default value (e.g., 0) if Usability rating is missing
    Performance: userRatings.Performance || 0, // Set a default value if Performance rating is missing
    Features: userRatings.Features || 0, // Set a default value if Features rating is missing
    Company: userRatings.Company || 0, // Set a default value if Company rating is missing
    Value: userRatings.Value || 0, // Set a default value if Value rating is missing
    Support: userRatings.Support || 0, // Set a default value if Support rating is missing
  });

  const userId = localStorage.getItem("userId");
const dispatch = useDispatch();
  useEffect(() => { 
    setID(info?._id)
    setSelectedRatings(currentRatings)

  }, [
    info?._id
  ]);

  function handleStarClick(aspect, value) {
    // console.log(aspect, value);
    setSelectedRatings(prevRatings => ({
      ...prevRatings,
      [aspect]: value,
    }));
  }

  const handleSubmit = async (e) => {
    console.log('sumnit')
    e.preventDefault();
    const body={
      Id:ID,
      ratings: selectedRatings
    }
    try {
      await dispatch(updateUserRatings(body)).unwrap()
      toast.success('Rating Updated')
      await dispatch(updateUserData(userId)).unwrap()   
      // Handle the response data here
    } catch (error) {
      toast.error('Error:', error);
      // Handle errors here
    }
  }
  // console.log(info.obj_id.rating)
  return (
    <div className="rating-component overlay-card">
      <h2>My Rating ⭐</h2>
  <p>Rate the app based on your experience</p>
  <div className="line"></div>

    <div className="ratings">
      <div className='rating flex'>
        <p>Usability</p><StarRating aspect='Usability' average={info?.obj_id?.rating?.Usability || 0} rating={selectedRatings.Usability} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating flex'>
        <p>Performance</p><StarRating aspect='Performance' average={info?.obj_id?.rating?.Perfomance || 0} rating={selectedRatings.Performance} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating flex'>
        <p>Features</p><StarRating aspect='Features' average={info?.obj_id?.rating?.Features  || 0} rating={selectedRatings.Features} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating flex'>
        <p>Company</p><StarRating aspect='Company' average={info?.obj_id?.rating?.Company || 0} rating={selectedRatings.Company} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating flex'>
        <p>Value</p><StarRating aspect='Value' average={info?.obj_id?.rating?.Value || 0} rating={selectedRatings.Value} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating flex'>
        <p>Support</p><StarRating aspect='Support' average={info?.obj_id?.rating?.Support || 0} rating={selectedRatings.Support} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
    </div>
    <div className="button-div" style={{alignSelf: "center"}}>
    <button className="btn btn-light" style={{marginRight: '10px'}} onClick={()=>setRatingPopup(false)}>Cancel</button>
    <button className="btn btn-dark" onClick={handleSubmit}>Rate</button>
  </div>
    </div>
  )   

}

export default RatingPopup